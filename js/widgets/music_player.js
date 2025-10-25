//https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
const musicPlayerElement = document.getElementById("musicPlayer");
const playBtn = document.getElementById("playButton");
const pauseBtn = document.getElementById("pauseButton");
const volumenControl = document.getElementById("volumenControl");
const songDuration = document.getElementById("songDuration");
const songTimeProgress = document.getElementById("songTimeProgress");
const progressBar = document.getElementById("progressBar");
const songTitle = document.getElementById("songTitle");
const albumCover = document.getElementById("albumCover");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
let currentSongIndex = 0;
let playlist = [];
musicPlayerElement.volume = 0.4;

function secondsToMinutes(second) {
    let minutes = String(Math.trunc(second / 60)).padStart(2, 0);
    let seconds = String(Math.trunc(second) - (60 * minutes)).padStart(2, 0);
    return `${minutes}:${seconds}`
}

function getNextSongIndex() {
    currentSongIndex ++;
    let isIndexValid = currentSongIndex <= playlist.length - 1;
    return isIndexValid ? currentSongIndex : 0;
}

function getPrevSongIndex() {
    currentSongIndex--;
    let isIndexValid = currentSongIndex >= 0;
    return isIndexValid ? currentSongIndex : playlist.length - 1;
}
async function fetchPlaylist() {
    return await fetch("./songs/playlist.json")
        .then(resp => resp.json())
        .then(resp => Object.values(resp));
}

async function setUpSong() {
    let currentSong = playlist[currentSongIndex];
    let coverURL = `url("${currentSong.cover}")`;
    musicPlayerElement.src = currentSong.src;
    songTitle.innerText = `${currentSong.title} - ${currentSong.artist}`;
    albumCover.style.setProperty("background-image", coverURL);
}
(async () => {
    playlist = await fetchPlaylist();
    await setUpSong();
})()

playBtn.addEventListener("click", () => {
    let isMusicPlayerReady = musicPlayerElement.readyState == 4;
    if (isMusicPlayerReady) {
        musicPlayerElement.play();
        playBtn.classList.toggle("hidden");
        pauseBtn.classList.toggle("hidden");
    }
});

pauseBtn.addEventListener("click", () => {
    if (musicPlayerElement.paused === false) {
        musicPlayerElement.pause();
        playBtn.classList.toggle("hidden");
        pauseBtn.classList.toggle("hidden");
    }
});

musicPlayerElement.addEventListener("canplaythrough", (e) => {
    songDuration.innerText = secondsToMinutes(Number(e.target.duration));
    progressBar.max = e.target.duration;
});

musicPlayerElement.addEventListener("timeupdate", (e) => {
    songTimeProgress.innerText = secondsToMinutes(Number(e.target.currentTime));
    progressBar.value = e.target.currentTime;
})

volumenControl.addEventListener("change", (e) => {
    musicPlayerElement.volume = Number(e.target.value);
});

nextButton.addEventListener("click", async (e) => {
    currentSongIndex = getNextSongIndex();
    await setUpSong();
});

prevButton.addEventListener("click", async (e) => {
    currentSongIndex = getPrevSongIndex();
    await setUpSong();
});