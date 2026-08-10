const button = document.querySelector('#revealButton');
const revealed = document.querySelector('#revealed');
const title = document.querySelector('#surpriseTitle');
const text = document.querySelector('#surpriseText');
const particles = document.querySelector('#particles');
const backgroundMusic = document.querySelector('#backgroundMusic');
const musicToggle = document.querySelector('#musicToggle');

function updateMusicButton(isPlaying) {
  musicToggle.classList.toggle('playing', isPlaying);
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pause our song' : 'Play our song');
  musicToggle.querySelector('.music-toggle-text').textContent = isPlaying ? 'Our song is playing' : 'Play our song';
}

async function playOurSong() {
  backgroundMusic.muted = false;
  backgroundMusic.volume = 0.45;
  try {
    await backgroundMusic.play();
    updateMusicButton(true);
  } catch {
    updateMusicButton(false);
  }
}

playOurSong();
document.addEventListener('pointerdown', playOurSong, { once: true });
musicToggle.addEventListener('click', () => {
  if (backgroundMusic.paused) playOurSong();
  else { backgroundMusic.pause(); updateMusicButton(false); }
});

function makeHeart(x, y) {
  const heart = document.createElement('span');
  heart.className = 'particle';
  heart.textContent = Math.random() > 0.25 ? '♥' : '✦';
  heart.style.left = `${x}%`;
  heart.style.top = `${y}%`;
  heart.style.fontSize = `${12 + Math.random() * 15}px`;
  heart.style.animationDuration = `${2 + Math.random() * 2}s`;
  particles.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

button.addEventListener('click', () => {
  revealed.classList.add('show');
  button.textContent = 'Caught with love! ♥';
  button.disabled = true;
  title.innerHTML = 'A little reminder:<br />I choose you. <span>♥</span>';
  text.textContent = 'Today, tomorrow, and every ordinary day made extraordinary with you.';
  for (let i = 0; i < 30; i++) setTimeout(() => makeHeart(20 + Math.random() * 60, 68 + Math.random() * 20), i * 45);
});

setInterval(() => makeHeart(Math.random() * 100, 82 + Math.random() * 18), 1150);
