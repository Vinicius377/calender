const container = document.querySelector(".container");
const [prev, next] = document.querySelectorAll(".status span");
const month = document.getElementById("mes");
const year = document.getElementById("ano");
const data = new Date();
data.setDate(1);

next.onclick = () => {
  data.setMonth(data.getMonth() + 1, 1);
  setValues();
};
prev.onclick = () => {
  data.setMonth(data.getMonth() - 1, 1);
  setValues();
};

function generateNewMonth(laterDate, countOfDays) {
  for (let i = 1; i < countOfDays + 1; i++) {
    if (i === 1) {
      for (let lastWeek = 0; lastWeek < data.getDay(); lastWeek++) {
        const element = document.createElement("div");
        element.className = "calender--day last--day";
        element.innerHTML =
          laterDate.getDate() - (data.getDay() - lastWeek) + 1;
        container.appendChild(element);
      }
    }
    const element = document.createElement("div");
    element.innerHTML = i;
    element.className = `calender--day`;
    container.appendChild(element);
  }
}

function setValues() {
  month.innerHTML = data.toLocaleDateString("pt-BR", { month: "long" });
  year.innerHTML = data.toLocaleDateString("pt-BR", { year: "numeric" });
  const countOfDays = new Date(
    data.getFullYear(),
    data.getMonth() + 1,
    0
  ).getDate();
  container.innerHTML = "";
  const laterDate = new Date(data.getFullYear(), data.getMonth(), 0);
  generateNewMonth(laterDate, countOfDays);
}

setValues();
