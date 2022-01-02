const container = document.querySelector(".container");
const [prev, next] = document.querySelectorAll(".status span");
const month = document.getElementById("month");
const year = document.getElementById("year");
const date = new Date();
date.setDate(1);

next.onclick = () => {
  date.setMonth(date.getMonth() + 1, 1);
  setValues();
};
prev.onclick = () => {
  date.setMonth(date.getMonth() - 1, 1);
  setValues();
};

function generateNewMonth(laterDate, countOfDays) {
  for (let i = 1; i < countOfDays.getDate() + 1; i++) {
    if (i === 1) {
      for (let firstWeek = 0; firstWeek < date.getDay(); firstWeek++) {
        const element = document.createElement("div");
        element.className = "calender--day last--day";
        element.innerHTML =
          laterDate.getDate() - (date.getDay() - firstWeek) + 1;
        container.appendChild(element);
      }
    }
    const element = document.createElement("div");
    element.innerHTML = i;
    element.className = `calender--day`;
    container.appendChild(element);

    if (i === countOfDays.getDate()) {
      for (let lastWeek = 1; 7 - countOfDays.getDay() > lastWeek; ++lastWeek) {
        const element = document.createElement("div");
        element.className = "calender--day last--day";
        element.innerHTML = lastWeek;
        container.appendChild(element);
      }
    }
  }
}

function setValues() {
  month.innerHTML = date.toLocaleDateString("pt-BR", { month: "long" });
  year.innerHTML = date.toLocaleDateString("pt-BR", { year: "numeric" });
  const countOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  container.innerHTML = "";
  const laterDate = new Date(date.getFullYear(), date.getMonth(), 0);
  generateNewMonth(laterDate, countOfDays);
}

setValues();
