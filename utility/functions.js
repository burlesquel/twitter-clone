function relativeTime(date_in_ms) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
  
    var elapsed = new Date().getTime() - date_in_ms;
  
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + 's';
    }
  
    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + 'm';
    }
  
    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + 'h';
    }
  
    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + 'd';
    }
  
    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + 'mo';
    }
  
    else {
      return Math.round(elapsed / msPerYear) + 'y';
    }
  }

  function getFormattedDate(date){
    const formatted = new Date(date).toLocaleString("en-US", {month:"short", hour:"numeric", minute:"numeric", day:"numeric", year:"numeric", hour12:true}) // 'Aug 19, 2022, 4:56 AM'
    const text = `${formatted.split(", ")[2]} · ${formatted.split(", ")[0]}, ${formatted.split(", ")[1]}`
    return text
  }

  export {relativeTime, getFormattedDate}