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

            {
              y: cy - this.modifyVar,
              fill: "#0090FF",
            }
          );
        });

        item.addEventListener("mouseout", (e) => {
          gsap.to(
            item,

            {
              y: cy,
              fill: "#ffffffd6",
            }
          );
        });
      });
    }
  }

  const map = new RussianMap();
  map.start();

  // let i = 0;
  // console.log("i0: ", i);
  // let trans, source, cx, cy, cym;

  // const mapUpper = () => {
  //   document.addEventListener("pointerover", (e) => {
  //     // console.log("trans: ", trans);
  //     if (e.target.matches("path,g,.region")) {
  //       trans = window.getComputedStyle(e.target).transform;
  //       source = trans.split(", ");
  //       cx = +source[4];
  //       cy = +source[5].split(")")[0];
  //       cym = cy - 10;

  //       const up = (cx, cy, target) => {
  //         gsap.fromTo(
  //           target,
  //           {
  //             // transform: `translate(${cx}px, ${cym}px)`,
  //             y: cy,
  //             fill: "#ffffffd6",
  //           },
  //           {
  //             y: cym,
  //             fill: "#0090FF",
  //           }
  //         );
  //       };
  //       do {
  //         up(cx, cy, e.target);
  //         i++;

  //         console.log("iup: ", i);
  //         if (i > 1 || i < 0) {
  //           i = 0;
  //         }
  //       } while (i < 1);
  //     }
  //   });

  //   document.addEventListener("pointerout", (e) => {
  //     // console.log("trans: ", trans);
  //     if (e.target.matches("path")) {
  //       // const trans = window.getComputedStyle(e.target).transform;
  //       // const source = trans.split(", ");
  //       // const cx = +source[4];
  //       // const cy = +source[5].split(")")[0];
  //       // const cym = cy + 2;

  //       const down = (cx, cy, target) => {
  //         gsap.fromTo(
  //           target,
  //           {
  //             // transform: `translate(${cx}px, ${cym}px)`,
  //             y: cym,
  //             fill: "#0090FF",
  //           },
  //           {
  //             y: cym + 10,
  //             fill: "#ffffffd6",
  //           }
  //         );
  //       };

  //       do {
  //         down(cx, cy, e.target);
  //         i--;
  //         console.log("idown: ", i);
  //         if (i > 1 || i < 0) {
  //           i = 0;
  //         }
  //       } while (i >= 1);
  //     }
  //   });
  // };

  // mapUpper();
});
