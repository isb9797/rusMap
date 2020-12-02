// import $ from 'jquery' // import module example (npm i -D jquery)
import { gsap } from "gsap";
document.addEventListener("DOMContentLoaded", () => {
  // Custom JS
  class RussianMap {
    constructor() {
      this.mapRegions = [];
      this.mapRegionsCoordinates = [];
      this.modifyVar = 10;
    }

    start() {
      //Получаем список регионов
      this.mapRegions = document.querySelectorAll(".region_item");

      const regions = this.mapRegions;

      regions.forEach((item, index) => {
        const trans = window.getComputedStyle(item).transform,
          source = trans.split(", "),
          cx = +source[4],
          cy = +source[5].split(")")[0],
          id = item.id;

        this.mapRegionsCoordinates = new Map([[item.id, cy]]);

        //Добавляем обработчик событий
        item.addEventListener("mouseover", (e) => {
          gsap.to(
            item,
            1,

            {
              y: cy - this.modifyVar,
              fill: "#0090FF",
              filter: "drop-shadow( 0px 20px 4px #000 )",
              duration: 0.25,
            }
          );
        });

        item.addEventListener("mouseout", (e) => {
          gsap.to(
            item,
            1,

            {
              y: cy,
              fill: "#dededf",
              filter: "drop-shadow( 0px 0px 0px #dededf)",
              duration: 0.25,
            }
          );
        });
      });
    }

    requestToServer(id) {
      let qty_product = 2;

      // Первым аргументом кладем путь, + строку как и в любом другом запросе, ключ=значение&ключ=значение
      fetch(
        "../db.json",

        // Второй аргумент это объект с указаниями, метода и заголовка
        {
          method: "GET",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }
      )
        .then((response) => {
          if (response.status !== 200) {
            return Promise.reject();
          }
          return response.text();
        })
        .then((i) => {
          const response = JSON.parse(i);
          const infoBlock = document.querySelector(".information");
          const regions = document.querySelectorAll("g .region");

          regions.forEach((item, index) => {
            item.addEventListener("click", (e) => {
              infoBlock.innerHTML = "";
              for (let resitem in response) {
                if (item.id === resitem) {
                  infoBlock.insertAdjacentHTML(
                    "afterBegin",
                    `<h1>${response[id].header}</h1>
                    <p>${response[id].description}</p>
                    <a href="#" class="btn button">Подробнее о регионе</a>`
                  );
                }
              }
            });
          });
        })
        .catch(() => console.log("ошибка"));
    }
  }

  const map = new RussianMap();
  map.start();
  map.requestToServer("KYA");
});
