class Tarifar{
  constructor(entryHour, exitHour){
    
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

    const diffMinutes = end - start;

    const totalHours = Math.max(1, Math.ceil(diffMinutes / 60));

    const base = 10; 
    return totalHours * base; 
  }

}

export default Tarifar; 
