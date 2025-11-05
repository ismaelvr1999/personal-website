const clockTimerElement = document.getElementById("clockTime");
const clockDateElement = document.getElementById("clockDate");
const clockTopBarElement = document.getElementById("topBarClock");

clockDateElement.innerText = new Date().toDateString();

setInterval(() => {
    const date = new Date();
    const currentTime = formatTime(date.toTimeString());
    clockTopBarElement.innerText = `${formatDate(date.toDateString())} ${currentTime}`;
    clockTimerElement.innerText = currentTime;
}, 1000);


function formatTime(time) {
    let timeInfo = time.split(" ");
    let [hour, minute,] = timeInfo[0].split(":")
    return `${hour}:${minute}`;
}

function formatDate(date) {
    let [, month, day] = date.split(' ');
    return `${month} ${day}`
}