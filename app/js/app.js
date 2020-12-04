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
      this.mapRegions = document.querySelectorAll(".active, .region_item");

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
              gsap.to(
                infoBlock,
                0,

                {
                  opacity: 0,
                  duration: 0,
                }
              );

              for (let resitem in response) {
                if (item.id === resitem) {
                  console.log(item.id);
                  infoBlock.innerHTML = "";
                  infoBlock.insertAdjacentHTML(
                    "afterBegin",
                    `<h1>${response[resitem].header}</h1>
                    <p>${response[resitem].description}</p>
                    <a href="#" class="btn button">Подробнее о регионе</a>`
                  );
                }

                gsap.to(
                  infoBlock,
                  1,

                  {
                    opacity: 1,
                    duration: 0.5,
                  }
                );
              }
            });
          });
        })
        .catch(() => console.log("ошибка"));
    }

    cursorInit() {
      // Custom Cursor
      var cursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: window.innerWidth / 2,
        endY: window.innerHeight / 2,
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: document.querySelector(".ppk-dot"),
        $outline: document.querySelector(".ppk-dot-outline"),

        init: function () {
          // Set up element sizes
          this.dotSize = this.$dot.offsetWidth;
          this.outlineSize = this.$outline.offsetWidth;

          this.setupEventListeners();
          this.animateDotOutline();
        },

        setupEventListeners: function () {
          var self = this;

          // Anchor hovering
          document.querySelectorAll("a").forEach(function (el) {
            el.addEventListener("mouseover", function () {
              self.cursorEnlarged = true;
              self.toggleCursorSize();
            });
            el.addEventListener("mouseout", function () {
              self.cursorEnlarged = false;
              self.toggleCursorSize();
            });
          });

          // Click events
          document.addEventListener("mousedown", function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
          });
          document.addEventListener("mouseup", function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
          });

          document.addEventListener("mousemove", function (e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + "px";
            self.$dot.style.left = self.endX + "px";
          });

          // Hide/show cursor
          document.addEventListener("mouseenter", function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
          });

          document.addEventListener("mouseleave", function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
          });
        },

        animateDotOutline: function () {
          var self = this;

          self._x += (self.endX - self._x) / self.delay;
          self._y += (self.endY - self._y) / self.delay;
          self.$outline.style.top = self._y + "px";
          self.$outline.style.left = self._x + "px";

          requestAnimationFrame(this.animateDotOutline.bind(self));
        },

        toggleCursorSize: function () {
          var self = this;

          if (self.cursorEnlarged) {
            self.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
            self.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
          } else {
            self.$dot.style.transform = "translate(-50%, -50%) scale(1)";
            self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
          }
        },

        toggleCursorVisibility: function () {
          var self = this;

          if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
          } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
          }
        },
      };

      cursor.init();
    }
  }

  const map = new RussianMap();
  map.start();
  map.requestToServer();
  map.cursorInit();
});
