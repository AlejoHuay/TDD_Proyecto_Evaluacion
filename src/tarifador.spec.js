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
});
