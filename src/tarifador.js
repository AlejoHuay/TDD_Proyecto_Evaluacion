class Tarifar{
  constructor(entryHour, exitHour, state){
    
    if (!entryHour || !/^\d{1,2}:\d{2}$/.test(entryHour)) {
      this.hoursEntry = null;
      this.minutesEntry = null;
    } else {
      const [hoursEntry, minutesEntry] = entryHour.split(":").map(Number);
      this.hoursEntry = hoursEntry;
      this.minutesEntry = minutesEntry;
    }

    if (!exitHour || !/^\d{1,2}:\d{2}$/.test(exitHour)) {
      this.hoursExit = null;
      this.minutesExit = null;
    } else {
      const [hoursExit, minutesExit] = exitHour.split(":").map(Number);
      this.hoursExit = hoursExit;
      this.minutesExit = minutesExit;
    }
    this.ticketState=state; 

  }
  showEntryHour(){
    return String(this.hoursEntry).padStart(2, "0") + ":" + String(this.minutesEntry).padStart(2, "0");
  }
  showExitHour(){
    return String(this.hoursExit).padStart(2, "0") + ":" + String(this.minutesExit).padStart(2, "0");
  }
  showTotalCost(){

    const start = this.hoursEntry * 60 + this.minutesEntry;
    const end   = this.hoursExit  * 60 + this.minutesExit;

    if (end < start) {
        return -1;
    }

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

    if (total === 0) total = base;

    if(total<=50){
        return total 
    }
    
    return 50;
  }
  showTicketState(){
    return this.ticketState;
  }

}

export default Tarifar; 
