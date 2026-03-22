let currentApp;
let currentAppHeader;
let offsetPositionX, offsetPositionY = 0;
let isWindowDragging = false;
const APPS = ["appTest"]
window.addEventListener("mousedown",(e)=>{
    console.log(e.target.id);
})

window.addEventListener("mousemove", (e) => {
    if (isWindowDragging) {
        let windowsPositionY = `${e.clientY - offsetPositionY}px`;
        let windowsPositionX = `${e.clientX - offsetPositionX}px`;
        currentApp.style.top = windowsPositionY;
        currentApp.style.left = windowsPositionX;
    }
});

window.addEventListener("mouseup", (e) => {
    if (isWindowDragging) {
        isWindowDragging = false;
    }
})

currentAppHeader.addEventListener("mousedown", (e) => {
    offsetPositionY = e.offsetY;
    offsetPositionX = e.offsetX;
    isWindowDragging = true;
})

currentAppHeader.addEventListener("mouseup", (e) => {
    offsetPositionY = 0;
    offsetPositionX = 0;
    isWindowDragging = false;
})

