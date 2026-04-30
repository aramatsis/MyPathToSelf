// js/audio.js

const audioList = [
  {
    title: "Погрузитесь в глубокое состояние покоя",
    src: "audio/meditation1.mp3",
    img: "images/audio1.jpeg",
    download: "audio/meditation1.mp3"
  },
  {
    title: "Медитация на дыхание",
    src: "audio/meditation2.mp3",
    img: "images/audio2.jpg",
    download: "audio/meditation2.mp3"
  },
  {
    title: "Медитация на эмоции",
    src: "audio/meditation3.mp3",
    img: "images/audio3.jpeg",
    download: "audio/meditation3.mp3"
  },
  {
    title: "Медитация на телесные ощущения",
    src: "audio/meditation4.mp3",
    img: "images/audio4.jpeg",
    download: "audio/meditation4.mp3"
  }
];

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('audio-grid');
  
  // Если контейнер не найден — выходим (например, на других страницах)
  if (!container) {
    console.warn("Элемент #audio-grid не найден. Аудио не будет загружено.");
    return;
  }

  audioList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'audio-card';

    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <p>${item.title}</p>
      <audio controls>
        <source src="${item.src}" type="audio/mpeg">
        Ваш браузер не поддерживает аудио.
      </audio>
      <button class="download-btn" onclick="window.open('${item.download}', '_blank')">
        Скачать
      </button>
      <div class="duration">--:--</div>
    `;

    container.appendChild(card);

    const audio = card.querySelector('audio');
    const durationEl = card.querySelector('.duration');

    // Получаем длительность после загрузки метаданных
    audio.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audio.duration);
    });

    // На случай, если метаданные уже загружены
    if (audio.readyState > 0) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });
});