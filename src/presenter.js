import Tarifar from "./tarifador.js";

const entryH = document.querySelector("#entry-hour");
const exitH = document.querySelector("#exit-hour");
const StateCbx = document.querySelector("#cbx-estado")

const form = document.querySelector("#tarifar-form");

const entryHourDiv = document.querySelector("#entryHour-div");
const exitHourDiv = document.querySelector("#exitHour-div");
const totalCostDiv = document.querySelector("#totalCost-div");
const ticketStateDiv = document.querySelector("#ticketState-div"); 

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entryHour = entryH.value;
  const exitHour = exitH.value;
  const ticketState = StateCbx.value;

  //const secondNumber = Number.parseInt(second.value);
  
  const tarifa = new Tarifar(entryHour, exitHour, ticketState); 

  entryHourDiv.innerHTML = "<p> Hora entrada: " + tarifa.showEntryHour() + "</p>";
  exitHourDiv.innerHTML = "<p> Hora salida: " + tarifa.showExitHour() + "</p>";
  ticketStateDiv.innerHTML = "<p> Ticket perdido?: " + tarifa.showTicketState() + "</p>";
  if(tarifa.showTotalCost()===-1){
    totalCostDiv.innerHTML = "<p> Costo total: La hora de salida no puede ser anterior a la de entrada. </p>";
  }else{
    totalCostDiv.innerHTML = "<p> Costo total: " + tarifa.showTotalCost() + " Bs</p>";
  }
});
