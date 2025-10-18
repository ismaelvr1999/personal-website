const windowElement = document.getElementById("window");
const windowHeader = document.getElementById("windowHeader");
const clockTimerElement = document.getElementById("clockTime");
const clockDateElement = document.getElementById("clockDate");
const clockTopBarElement = document.getElementById("topBarClock");

let offsetPositionX, offsetPositionY = 0;
let isWindowDragging = false;

clockDateElement.innerText = new Date().toDateString();

setInterval(() => {
    const date = new Date();
    const currentTime = formatTime(date.toTimeString());
    clockTopBarElement.innerText = `${formatDate(date.toDateString())} ${currentTime}`;
    clockTimerElement.innerText = currentTime;
}, 1000)

window.addEventListener("mousemove", (e) => {
    if (isWindowDragging) {
        let windowsPositionY = `${e.clientY - offsetPositionY}px`;
        let windowsPositionX = `${e.clientX - offsetPositionX}px`;
        windowElement.style.top = windowsPositionY;
        windowElement.style.left = windowsPositionX;
    }
});

window.addEventListener("mouseup", (e) => {
    if (isWindowDragging) {
        isWindowDragging = false;
    }
})

windowHeader.addEventListener("mousedown", (e) => {
    offsetPositionY = e.offsetY;
    offsetPositionX = e.offsetX;
    isWindowDragging = true;
})

windowHeader.addEventListener("mouseup", (e) => {
    offsetPositionY = 0;
    offsetPositionX = 0;
    isWindowDragging = false;
})

function formatTime(time) {
    let timeInfo = time.split(" ");
    let [ hour,minute,] = timeInfo[0].split(":")
    return `${hour}:${minute}`;
}

function formatDate(date) {
    let [,month,day] = date.split(' ');
    return `${month} ${day}`
}

