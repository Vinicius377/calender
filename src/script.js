const container = document.querySelector(".container");
const [prev, next] = document.querySelectorAll(".status span");
const month = document.getElementById("month");
const year = document.getElementById("year");
const date = new Date();
const events = ["10-janeiro-2022", "01-março-2022"];
date.setDate(1);

next.onclick = () => {
  date.setMonth(date.getMonth() + 1, 1);
  setValues();
};
prev.onclick = () => {
  date.setMonth(date.getMonth() - 1, 1);
  setValues();
};
/**
 * verificar se existe evento na agenda
 */
const checkDayBeEvent = (day) => {
  const stringData = `${day < 10 ? "0" + day : day}-${month.innerHTML}-${
    year.innerHTML
  }`;
  return events.includes(stringData);
};

/**
 * gerar um novo frame de mes
 */
function generateNewMonth(laterDate, countOfDays) {
  for (let i = 1; i < countOfDays.getDate() + 1; i++) {
    const existEvent = checkDayBeEvent(i);
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
    element.innerHTML = i < 10 ? "0" + i : i;
    element.className = `${existEvent && "calender--event"} calender--day `;
    element.onclick = agendDay;
    container.appendChild(element);

    if (i === countOfDays.getDate()) {
      for (let lastWeek = 1; 7 - countOfDays.getDay() > lastWeek; ++lastWeek) {
        const element = document.createElement("div");
        element.className = "calender--day last--day";
        element.innerHTML = lastWeek < 10 ? "0" + lastWeek : lastWeek;
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
/**
 * agenda
 */
const agend = document.querySelector("#agend");

/**
 * pegar os eventos do dia
 */
let dataString = "";
let dataOfEvents;

async function getEventsDay(date) {
  dataString = `${date.day}-${date.month}-${date.year}`;
  // if (!events.includes(dataString)) return { data: [] }
  const req = await fetch(`http://localhost:3000/events/${dataString}`);
  const res = await req.json();
  dataOfEvents = res;
}

function agendDay(e) {
  agend.classList.add("active");

  agend.querySelector("#dayAgend").innerHTML = e.target.innerHTML;
  agend.querySelector("#monthAgend").innerHTML = month.innerHTML;
  agend.querySelector("#yearAgend").innerHTML = year.innerHTML;

  showEventData(e.target.innerHTML);
}

/**
 * mostrar dados dos eventos
 */
const dataEventsContainer = document.querySelector(".events--container");

async function showEventData(day) {
  dataEventsContainer.innerHTML = "";
  const dateAgend = {
    day,
    month: month.innerHTML,
    year: year.innerHTML,
  };
  await getEventsDay(dateAgend);
  elementHTMLCreate(dataOfEvents);
}
/**
 * Criando elemento
 */
function elementHTMLCreate() {
  dataEventsContainer.innerHTML = "";
  dataOfEvents.data?.forEach((event) => {
    const eventItem = document.createElement("div");
    eventItem.className = "events--item";
    eventItem.innerHTML = `
    <div class="event--title">
    <h1>${event.subject}</h1>
    <button onclick="removeItem(this)">X</button>
    </div>
      <p>${event.body}</p>
    `;
    dataEventsContainer.appendChild(eventItem);
  });
}
function removeItem(e) {
  e.closest(".events--item").remove();
}
/**
 * Formulario de novo evento
 */
const buttonSubmit = document.querySelector("#send");
buttonSubmit.addEventListener("click", formSending);

function formSending(e) {
  const subject = document.querySelector("#subject");
  const body = document.querySelector("#body");
  const inputs = {
    date: dataString,
    subject: subject.value,
    body: body.value,
  };
  e.preventDefault();
  fetch("http://localhost:3000/events", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  })
    .then((res) => res.json())
    .then((res) => {
      dataOfEvents.data?.unshift(inputs);
      console.log(res);
      elementHTMLCreate();
    });
}
/**
 * fechar agenda
 */
document
  .querySelector("#closeAgend")
  .addEventListener("click", () => agend.classList.remove("active"));
