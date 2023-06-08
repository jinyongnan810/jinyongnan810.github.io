const progressBar = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

let currentActive = 0;
progressBar.style.width = "0%";
next.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circles.length - 1) {
    currentActive = circles.length - 1;
  }
  update();
});
prev.addEventListener("click", () => {
  currentActive--;
  if (currentActive == 0) {
    currentActive = 0;
  }
  update();
});

const update = () => {
  progressBar.style.width = (currentActive / (circles.length - 1)) * 100 + "%";
  if (currentActive === 0) {
    prev.disabled = true;
  } else if (currentActive === circles.length - 1) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
  for (let i = 0; i <= currentActive; i++) {
    circles[i].classList.add("active");
  }
  for (let i = currentActive + 1; i < circles.length; i++) {
    circles[i].classList.remove("active");
  }
};
