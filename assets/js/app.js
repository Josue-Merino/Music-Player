document.addEventListener('DOMContentLoaded', () => {
    
    const audio = document.querySelector('#song');
    const coverSong = document.querySelector('#coverSong');
    const tittleSong = document.querySelector('#tittleSong');
    const authorSong = document.querySelector('#authorSong');
    const playPauseBtn = document.querySelector('#playPause');
    const forwardBtn = document.querySelector('#forward');
    const backwardBtn = document.querySelector('#backward');
    const progressBar = document.querySelector('#progressBar');
    const currentTimeSpan = document.querySelector('#currentTimeSpan');
    const durationSpan = document.querySelector('#durationSong');
    const icon = document.querySelector('#icon');
  
    // Playlist array containing song details
    const playlist = [
      {
        src: '/assets/audio/lost-in-city-lights-145038.mp3',
        cover: '/assets/img/cover-1.png',
        title: 'Lost in the City Lights',
        author: 'Cosmo Sheldrake',
      },
      {
        src: '/assets/audio/forest-lullaby-110624.mp3',
        cover: '/assets/img/cover-2.png',
        title: 'Forest Lullaby',
        author: 'Lesfm',
      },
    ];
  
    let songIndex = 0;
  
    // Load the first song
    loadSong(songIndex);
  
    // Event listeners
    playPauseBtn.addEventListener('click', playPauseSong);
    audio.addEventListener('timeupdate', updateTime);
    progressBar.addEventListener('input', updateProgressBar);
    audio.addEventListener('loadedmetadata', updateDurationSong);
    forwardBtn.addEventListener('click', forwardSong);
    backwardBtn.addEventListener('click', backwardSong);
    audio.addEventListener('ended', playNextSong);
  
    // Load a song based on its index in the playlist
    function loadSong(index) {
      const song = playlist[index];
      audio.src = song.src;
      coverSong.src = song.cover;
      tittleSong.textContent = song.title;
      authorSong.textContent = song.author;
  
      // Reset progress bar and time
      progressBar.value = 0;
      currentTimeSpan.textContent = '00:00';
      durationSpan.textContent = '00:00';
    }
  
    // Toggle play and pause states
    function playPauseSong() {
      if (audio.paused) {
        audio.play();
        icon.src = '/assets/img/icons/continue.svg'; // Cambiar ícono a 'Pausa'
      } else {
        audio.pause();
        icon.src = '/assets/img/icons/Play_fill.svg'; // Cambiar ícono a 'Reproducir'
      }
    }
  
    // Update progress bar and current time display
    function updateTime() {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
      }
    }
  
    // Seek to a specific point in the audio based on the progress bar value
    function updateProgressBar() {
      const seekTime = (progressBar.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  
    // Skip forward 10 seconds
    function forwardSong() {
      audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    }
  
    // Skip backward 10 seconds
    function backwardSong() {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  
    // Display the total duration of the current song
    function updateDurationSong() {
      durationSpan.textContent = formatTime(audio.duration);
    }
  
    // Play the next song in the playlist
    function playNextSong() {
      songIndex = (songIndex + 1) % playlist.length; // Bucle entre canciones
      loadSong(songIndex);
      audio.play();
      icon.src = '/assets/img/icons/continue.svg'; // Cambiar ícono a 'Pausa'
    }
  
    // Format time in seconds to a `MM:SS` format
    function formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
});
  