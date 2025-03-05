const fileInput = document.getElementById('file-input');
const songTitle = document.querySelector('.song-title');
const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progress-bar');
const audio = new Audio();

let isPlaying = false;

// Handle File Selection
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const objectURL = URL.createObjectURL(file);
    audio.src = objectURL;
    songTitle.textContent = file.name; // Display the song name
    audio.load();
    resetPlayer();
  }
});

// Play/Pause Button
playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '&#9658;'; // Change to play icon
  } else {
    audio.play();
    playBtn.innerHTML = '&#10074;&#10074;'; // Change to pause icon
  }
  isPlaying = !isPlaying;
});

// Update Progress Bar
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progressBar.value = (currentTime / duration) * 100;

  // Update Time Labels
  const startTime = document.querySelector('.progress-container span:first-child');
  const endTime = document.querySelector('.progress-container span:last-child');

  startTime.textContent = formatTime(currentTime);
  endTime.textContent = formatTime(duration);
});

// Seek Song
progressBar.addEventListener('input', () => {
  const duration = audio.duration;
  audio.currentTime = (progressBar.value / 100) * duration;
});

// Reset Player
function resetPlayer() {
  isPlaying = false;
  playBtn.innerHTML = '&#9658;'; // Reset to play icon
  progressBar.value = 0;

  // Reset Time Labels
  const startTime = document.querySelector('.progress-container span:first-child');
  const endTime = document.querySelector('.progress-container span:last-child');

  startTime.textContent = '00:00';
  endTime.textContent = '00:00';
}

// Format Time Function
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
