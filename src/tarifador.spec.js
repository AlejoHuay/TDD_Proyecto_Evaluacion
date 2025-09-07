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
    expect(tarifa.showTotalCost()).toEqual(40);
  });

  it("Deberia Validar que la hora de entrada no sea despues de la de salida", () => {
    const tarifa = new Tarifar("15:00","12:01")
    expect(tarifa.showTotalCost()).toEqual(-1);
  });
});
