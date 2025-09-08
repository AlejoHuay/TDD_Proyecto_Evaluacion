class Tarifar{
  constructor(entryDate, exitDate, state){

    if (typeof entryDate === "string" && entryDate.includes("T")) {
      
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(entryDate)) {
        this.hoursEntry = null; this.minutesEntry = null;
        this.dayEntry = null; this.monthEntry = null; this.yearEntry = null;
      } else {
        const [fechaEntrada, horaEntrada] = entryDate.split("T");
        const [yearEntry, monthEntry, dayEntry] = fechaEntrada.split("-").map(Number); 
        const [hoursEntry, minutesEntry] = horaEntrada.split(":").map(Number);
        this.yearEntry = yearEntry; this.monthEntry = monthEntry; this.dayEntry = dayEntry;
        this.hoursEntry = hoursEntry; this.minutesEntry = minutesEntry;
      }
    } else {

      if (!entryDate || !/^\d{1,2}:\d{2}$/.test(entryDate)) {
        this.hoursEntry = null; this.minutesEntry = null;
        this.dayEntry = null; this.monthEntry = null; this.yearEntry = null;
      } else {
        const [hoursEntry, minutesEntry] = entryDate.split(":").map(Number);
        this.hoursEntry = hoursEntry; this.minutesEntry = minutesEntry;
        this.dayEntry = null; this.monthEntry = null; this.yearEntry = null;
      }
    }

    if (typeof exitDate === "string" && exitDate.includes("T")) {

      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(exitDate)) {
        this.hoursExit = null; this.minutesExit = null;
        this.dayExit = null; this.monthExit = null; this.yearExit = null;
      } else {
        const [fechaSalida, horaSalida] = exitDate.split("T");
        const [yearExit, monthExit, dayExit] = fechaSalida.split("-").map(Number); 
        const [hoursExit, minutesExit] = horaSalida.split(":").map(Number);
        this.yearExit = yearExit; this.monthExit = monthExit; this.dayExit = dayExit;
        this.hoursExit = hoursExit; this.minutesExit = minutesExit;
      }
    } else {

      if (!exitDate || !/^\d{1,2}:\d{2}$/.test(exitDate)) {
        this.hoursExit = null; this.minutesExit = null;
        this.dayExit = null; this.monthExit = null; this.yearExit = null;
      } else {
        const [hoursExit, minutesExit] = exitDate.split(":").map(Number);
        this.hoursExit = hoursExit; this.minutesExit = minutesExit;
        this.dayExit = null; this.monthExit = null; this.yearExit = null;
      }
    }

    this.ticketState = state;
  }
  showEntryHour(){
    return String(this.hoursEntry).padStart(2, "0") + ":" + String(this.minutesEntry).padStart(2, "0");
  }
  showExitHour(){
    return String(this.hoursExit).padStart(2, "0") + ":" + String(this.minutesExit).padStart(2, "0");
  }
  showEntryDate(){
    return String(this.monthEntry).padStart(2, "0") + " " + String(this.dayEntry).padStart(2, "0") + " at " + this.showEntryHour();
  }
  showExitDate(){
    return String(this.monthExit).padStart(2, "0") + " " + String(this.dayExit).padStart(2, "0") + " at " + this.showExitHour();
  }
  showTotalCost(){

  if(this.ticketState==="si"){ return 80; }

  const hasEntryDate = this.yearEntry != null && this.monthEntry != null && this.dayEntry != null;
  const hasExitDate  = this.yearExit  != null && this.monthExit  != null && this.dayExit  != null;
  
  if (hasEntryDate && hasExitDate) {
    const entryYMD = this.yearEntry * 10000 + this.monthEntry * 100 + this.dayEntry;
    const exitYMD  = this.yearExit  * 10000 + this.monthExit  * 100 + this.dayExit;
    if (exitYMD < entryYMD) { 
      return -2;
    }
    
  }

    const start = this.hoursEntry * 60 + this.minutesEntry;
    const end   = this.hoursExit  * 60 + this.minutesExit;

    if (end < start){ return -1; }

    const diffMinutes = end - start;

    //const totalHours = Math.max(1, Math.ceil(diffMinutes / 60));

    const base = 10; 
    const nocturne = 6; 

    const DAY_START = 6 * 60;   // 06:00
    const DAY_END   = 22 * 60;  // 22:00

    const dayMinutes = Math.max(0, Math.min(end, DAY_END) - Math.max(start, DAY_START));
    const nightMinutes = diffMinutes - dayMinutes;

    const dayHours   = dayMinutes  > 0 ? Math.ceil(dayMinutes / 60)  : 0;
    const nightHours = nightMinutes > 0 ? Math.ceil(nightMinutes / 60) : 0;

    let total = (dayHours * base) + (nightHours * nocturne);
    
    if (total === 0){ total = base; }
      
    if(total<=50){
        return total 
    }
    return 50;
  }
  showTicketState(){
    return this.ticketState;
  }
  showPenalty(){
    if(this.ticketState==="si"){
        return 80;
    }
    return 0;
  }
}

export default Tarifar; 
