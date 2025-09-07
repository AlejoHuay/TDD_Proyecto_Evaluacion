import Tarifar from "./tarifador.js";

const entryH = document.querySelector("#entry-hour");
//const second = document.querySelector("#segundo-numero");
const form = document.querySelector("#tarifar-form");
const entryHourDiv = document.querySelector("#entryHour-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entryHour = entryH.value;
  //const secondNumber = Number.parseInt(second.value);
  const tarifa = new Tarifar(entryHour);


  entryHourDiv.innerHTML = "<p> Hora entrada: " + tarifa.showEntryHour() + "</p>";
});
