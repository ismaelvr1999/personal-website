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
const loadingSongScreen = document.getElementById("loadingSongScreen")

let currentSongIndex = 0;
let playlist = [];
let canplay = false;
musicPlayerElement.volume = 0.4;

function formatSongDuration(duration) {
    let minutes = String(Math.trunc(duration / 60)).padStart(2, 0);
    let seconds = String(Math.trunc(duration) - (60 * minutes)).padStart(2, 0);
    return `${minutes}:${seconds}`
}

function getNextSongIndex(currentIndex) {
    currentIndex++;
    let isIndexValid = currentIndex <= playlist.length - 1;
    return isIndexValid ? currentIndex : 0;
}

function getPrevSongIndex(currentIndex) {
    currentIndex--;
    let isIndexValid = currentIndex >= 0;
    return isIndexValid ? currentIndex : playlist.length - 1;
}
async function fetchPlaylist() {
    return await fetch("./songs/playlist.json")
        .then(resp => resp.json())
        .then(resp => Object.values(resp));
}

function setUpSong() {
    canplay = false;
    loadingSongScreen.classList.add("loading-song");
    loadingSongScreen.classList.remove("hidden");
    let currentSong = playlist[currentSongIndex];
    let coverURL = `url("${currentSong.cover}")`;
    musicPlayerElement.src = currentSong.src;
    songTitle.innerText = `${currentSong.title} - ${currentSong.artist}`;
    albumCover.style.setProperty("background-image", coverURL);
}

function pauseSong() {
    if (musicPlayerElement.paused === false) {
        musicPlayerElement.pause();
        playBtn.classList.toggle("hidden");
        pauseBtn.classList.toggle("hidden");
    }
}

function playSong() {
    let waitUntilReady = setInterval(() => {
        if (canplay) {
            playBtn.classList.toggle("hidden");
            pauseBtn.classList.toggle("hidden");
            musicPlayerElement.play();
            clearInterval(waitUntilReady);
        }
    }, 500)
}

function playNextSong() {
    pauseSong();
    currentSongIndex = getNextSongIndex(currentSongIndex);
    setUpSong();
    playSong();
}

(async () => {
    playlist = await fetchPlaylist();
    setUpSong();
})()

playBtn.addEventListener("click", playSong);

pauseBtn.addEventListener("click", pauseSong);

musicPlayerElement.addEventListener("canplay", () => {
    canplay = true;
    loadingSongScreen.classList.add("hidden");
    loadingSongScreen.classList.remove("loading-song");
})

musicPlayerElement.addEventListener("durationchange", (e) => {
    songDuration.innerText = formatSongDuration(Number(e.target.duration));
    progressBar.max = e.target.duration;
});

musicPlayerElement.addEventListener("timeupdate", (e) => {
    songTimeProgress.innerText = formatSongDuration(Number(e.target.currentTime));
    progressBar.value = e.target.currentTime;
    if (progressBar.value === progressBar.max) {
        playNextSong();
    }
});

volumenControl.addEventListener("change", (e) => {
    musicPlayerElement.volume = Number(e.target.value);
});

nextButton.addEventListener("click",playNextSong);

prevButton.addEventListener("click", async (e) => {
    pauseSong();
    currentSongIndex = getPrevSongIndex(currentSongIndex);
    setUpSong();
    playSong();
});