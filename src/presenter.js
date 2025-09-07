import Tarifar from "./tarifador.js";

const entryH = document.querySelector("#entry-hour");
const exitH = document.querySelector("#exit-hour");

const form = document.querySelector("#tarifar-form");

const entryHourDiv = document.querySelector("#entryHour-div");
const exitHourDiv = document.querySelector("#exitHour-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entryHour = entryH.value;
  const exitHour = exitH.value;

  //const secondNumber = Number.parseInt(second.value);
  
  const tarifa = new Tarifar(entryHour, exitHour); 

  entryHourDiv.innerHTML = "<p> Hora entrada: " + tarifa.showEntryHour() + "</p>";
  exitHourDiv.innerHTML = "<p> Hora salida: " + tarifa.showExitHour() + "</p>";
});
