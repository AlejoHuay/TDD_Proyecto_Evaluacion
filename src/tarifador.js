class Tarifar{
  constructor(entryHour){

    const [hoursEntry, minutesEntry] = entryHour.split(":").map(Number);
    this.hoursEntry=hoursEntry;   
    this.minutesEntry=minutesEntry;

  }
  showEntryHour(){
    return String(this.hoursEntry).padStart(2, "0") + ":" + String(this.minutesEntry).padStart(2, "0");
  }

}

export default Tarifar; 
