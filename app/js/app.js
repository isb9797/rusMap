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
      this.mapRegions = document.querySelectorAll(".region");

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
              zIndex: 10000,
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
              zIndex: 0,
              fill: "#dededf",
              duration: 0.25,
            }
          );
        });
      });
    }
  }

  const map = new RussianMap();
  map.start();
});
