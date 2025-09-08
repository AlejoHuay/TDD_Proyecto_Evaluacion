import Tarifar from "./tarifador.js";

const entryD = document.querySelector("#entry-date");
const exitD = document.querySelector("#exit-date");
const StateCbx = document.querySelector("#cbx-estado")

const form = document.querySelector("#tarifar-form");

const entryDateDiv = document.querySelector("#entryDate-div");
const exitDateDiv = document.querySelector("#exitDate-div");
const totalCostDiv = document.querySelector("#totalCost-div");
const ticketStateDiv = document.querySelector("#ticketState-div"); 

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entryDate = entryD.value;
  const exitDate = exitD.value;
  const ticketState = StateCbx.value;

  //const secondNumber = Number.parseInt(second.value);
  
  const tarifa = new Tarifar(entryDate, exitDate, ticketState); 

  entryDateDiv.innerHTML = "<p> Fecha entrada: " + tarifa.showEntryDate() + "</p>";
  exitDateDiv.innerHTML = "<p> Fecha salida: " + tarifa.showExitDate() + "</p>";
  ticketStateDiv.innerHTML = "<p> Ticket perdido? (" + tarifa.showTicketState() + "): " + tarifa.showPenalty() + " Bs</p>";
  if(tarifa.showTotalCost()===-1){
    totalCostDiv.innerHTML = "<p> Costo total: La hora de salida no puede ser anterior a la de entrada. </p>";
  }else{
    totalCostDiv.innerHTML = "<p> Costo total: " + tarifa.showTotalCost() + " Bs</p>";
  }
});
