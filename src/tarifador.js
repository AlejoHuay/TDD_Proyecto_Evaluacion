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
    this.finalCost=0;
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
    
      if (exitYMD > entryYMD) {
        const base = 10; 
        const nocturne = 6; 
        const DAY_START = 6 * 60;   // 06:00
        const DAY_END   = 22 * 60;  // 22:00

        const ceilHours = (m) => (m <= 0 ? 0 : Math.ceil(m / 60));
        const fmt2 = (n) => String(n).padStart(2, "0");
        const fmtDate = (y,m,d) => `${y}-${fmt2(m)}-${fmt2(d)}`;

        const dStart = new Date(this.yearEntry, this.monthEntry - 1, this.dayEntry);
        const dEnd   = new Date(this.yearExit,  this.monthExit  - 1, this.dayExit);
        const lines = [];
        let totalGlobal = 0;

        for (let d = new Date(dStart); d <= dEnd; d.setDate(d.getDate() + 1)) {
          const y = d.getFullYear();
          const m = d.getMonth() + 1; // 1..12
          const day = d.getDate();

          let start = 0;
          let end = 24 * 60;

          if (y === this.yearEntry && m === this.monthEntry && day === this.dayEntry) {
            start = this.hoursEntry * 60 + this.minutesEntry;
          }
          
          if (y === this.yearExit && m === this.monthExit && day === this.dayExit) {
            end = this.hoursExit * 60 + this.minutesExit;
          }

          if (end < start) { start = end; }

          const diffMinutes = end - start;
          
          const dayMinutes = Math.max(0, Math.min(end, DAY_END) - Math.max(start, DAY_START));
          const nightMinutes = diffMinutes - dayMinutes;

          const dayHours   = ceilHours(dayMinutes);
          const nightHours = ceilHours(nightMinutes);

          const subtotal = (dayHours * base) + (nightHours * nocturne);
          const effective = subtotal === 0 ? base : subtotal;

          const capped = Math.min(50, effective);

          totalGlobal += capped;
          lines.push(`${fmtDate(y,m,day)} → antes_tope=${effective} | despues_tope=${capped}`);
        }
        this.finalCost=totalGlobal.toFixed(2); // "84.00"; 
        lines.push(`TOTAL=${this.finalCost}`);
        return lines.join("\n");
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
      this.finalCost=total;
        return this.finalCost.toFixed(2);
    }
    this.finalCost=50;
    return this.finalCost.toFixed(2);
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
