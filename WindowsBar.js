let date;
let updater;
function updateClock(element){
    date = new Date();
    let hour = date.getHours().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let min = date.getMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2});
    let sec = date.getSeconds().toLocaleString('en-us', {minimumIntegerDigits: 2})
    element.innerHTML = `<b>${date.getMonth()}/${date.getDate()}/${date.getFullYear()} <br> ${hour}:${min}:${sec}</b>`;


}
document.addEventListener("DOMContentLoaded", (event)=>{

    let clock = document.getElementById("datetime");
    
    updater = setInterval(updateClock, 1000, clock);
    


});