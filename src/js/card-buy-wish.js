const items = document.querySelectorAll(".item");
const container = document.querySelector(".container");
let deg;
let custom_style = {};
container.addEventListener("click", () => {
  deg = -items.length * 5;
  items.forEach((item) => {
    custom_style = {
      transform: `rotate(${deg}deg)`,
      "-webkit-transform": `rotate(${deg}deg)`,
      "-moz-transform": `rotate(${deg}deg)`,
      "-ms-transform": `rotate(${deg}deg)`,
      "-o-transform": `rotate(${deg}deg)`,
    };

    //Object.assign():
    Object.assign(item.style, custom_style);
    deg += 10;
  });
});

// for (let i = 0; i < items.length; i++) {
//   //   item.css({
//   //     transform: `rotate(${i}deg)`,
//   // "-webkit-transform": `rotate(${i}deg)`,
//   // "-moz-transform": `rotate(${i}deg)`,
//   // "-ms-transform": `rotate(${i}deg)`,
//   // "-o-transform": `rotate(${i}deg)`,
//   //   });
//   console.log(items[i]);
//   items[i].css("transform", `rotate(${deg}deg)`);
//   //   item.style.transform = `rotate(${i}deg)`;
//   //   i == 0 ? (i += 20) : (i += 10);
//   deg += 10;
// }
