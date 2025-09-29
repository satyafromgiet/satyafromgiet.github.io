// Elements
const background = document.querySelector('#background');
const thumbnail = document.querySelector('#thumbnail');
const song = document.querySelector('#song');
const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const progressBar = document.querySelector('#progress-bar');
const pPause = document.querySelector('#play-pause');

let playing = true;
let songIndex = 0;

const songs = ['./assets/music/beyonce.mp3', './assets/music/dontstartnow.mp3'];
const thumbnails = ['./assets/images/lemonade.png', './assets/images/dontstartnow.png'];
const songArtists = ['Beyonce', 'Dua Lipa'];
const songTitles = ["Don't Hurt Yourself", "Don't Start Now"];

// Play / Pause
function playPause() {
    if (playing) {
        pPause.src = "./assets/icons/pause.png";
        thumbnail.style.transform = "scale(1.15)";
        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play.png";
        thumbnail.style.transform = "scale(1)";
        song.pause();
        playing = true;
    }
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) songIndex = 0;

    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];
    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// Previous Song
function previousSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;

    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];
    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// Update progress bar + times
function updateProgressValue() {
    progressBar.max = song.duration || 0;
    progressBar.value = song.currentTime || 0;

    document.querySelector('.currentTime').innerHTML = formatTime(Math.floor(song.currentTime));
    document.querySelector('.durationTime').innerHTML =
        isNaN(song.duration) ? "0:00" : formatTime(Math.floor(song.duration));
}

// Format MM:SS
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
}

// Change progress manually
function changeProgressBar() {
    song.currentTime = progressBar.value;
}

// Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    pPause.addEventListener("click", playPause);
    progressBar.addEventListener("change", changeProgressBar);
    song.addEventListener("ended", nextSong);
    setInterval(updateProgressValue, 500);
});
