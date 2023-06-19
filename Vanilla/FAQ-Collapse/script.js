const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  const btns = box.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      box.classList.toggle("active");
    });
  });
});
