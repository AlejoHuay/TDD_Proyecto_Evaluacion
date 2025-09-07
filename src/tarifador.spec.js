import Tarifar from "./tarifador.js";

describe("Tarifar", () => {
  it("Deberia Ingresar hora de ingreso y mostrar en pantalla lo ingresado", () => {
    const tarifa = new Tarifar("3:16")
    expect(tarifa.showEntryHour()).toEqual("03:16");
  });
});
