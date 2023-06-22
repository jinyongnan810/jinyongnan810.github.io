const input = document.getElementById("input");
const choices = document.getElementById("choices");

input.addEventListener("input", () => {
  const text = input.value;
  choices.innerHTML = text
    .split(",")
    .map((choiceText) => {
      return `<div class="choice">${choiceText.trim()}</div>`;
    })
    .join("");
});
