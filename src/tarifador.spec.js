import Tarifar from "./tarifador.js";

describe("Tarifar", () => {

  it("Deberia Ingresar hora de ingreso y mostrar en pantalla lo ingresado", () => {
    const tarifa = new Tarifar("3:16")
    expect(tarifa.showEntryHour()).toEqual("03:16");
  });

  it("Deberia Ingresar hora de salida y mostrar en pantalla lo ingresado", () => {
    const tarifa = new Tarifar("3:16","7:06")
    expect(tarifa.showExitHour()).toEqual("07:06");
  });

  it("Deberia Mostrar el monto total a pagar con la tarifa base", () => {
    const tarifa = new Tarifar("12:00","15:01")
    expect(tarifa.showTotalCost()).toEqual("40.00");
  });

  it("Deberia Validar que la hora de entrada no sea despues de la de salida", () => {
    const tarifa = new Tarifar("15:00","12:01")
    expect(tarifa.showTotalCost()).toEqual(-1);
  });

  it("Deberia Mostrar el monto total a pagar con la tarifa nocturna.", () => {
    const tarifa = new Tarifar("12:03","23:03")
    expect(tarifa.showTotalCost()).toEqual("50.00");
  });

  it("Deberia Mostrar el monto total a pagar segun el tope maximo por dia calendario.", () => {
    const tarifa = new Tarifar("12:03","20:03")
    expect(tarifa.showTotalCost()).toEqual("50.00");
  });

  it("Deberia Seleccionar estado del ticket y mostrar eleccion.", () => {
    const tarifa = new Tarifar("12:03","20:03", "si")
    expect(tarifa.showTicketState()).toEqual("si");
  });

  it("Deberia Seleccionar estado del ticket y mostrar el monto de la penalidad que tiene el estado seleccionado", () => {
    const tarifa = new Tarifar("12:03","20:03", "si")
    expect(tarifa.showPenalty()).toEqual(80);
  });

  it("Deberia Mostrar el monto final a pagar con la penalidad para el estado de ticket seleccionado", () => {
    const tarifa = new Tarifar("12:03","20:03", "si")
    expect(tarifa.showTotalCost()).toEqual(80);
  });

  it("Deberia Validar que la fecha de salida no pueda ser anterior a la de entrada", () => {
    const tarifa = new Tarifar("2025-09-08T08:00", "2025-09-07T10:00")
    expect(tarifa.showTotalCost()).toEqual(-2);
  });

  it("Deberia Mostrar un desglose por día cuando la estadía cruza varios días", () => {
    const tarifa = new Tarifar("2025-09-07T21:30", "2025-09-09T01:15")
    expect(tarifa.showTotalCost()).toEqual(
      "2025-09-07 → antes_tope=22 | despues_tope=22\n" +
      "2025-09-08 → antes_tope=208 | despues_tope=50\n" +
      "2025-09-09 → antes_tope=12 | despues_tope=12\n" +
      "TOTAL=84.00"
    );
  });

  it("Deberia Mostrar el monto final con redondeo monetario a dos decimales.", () => {
    const tarifa = new Tarifar("12:03","20:03", "si")
    expect(tarifa.showTotalCost()).toEqual(80.00);
  });


});
