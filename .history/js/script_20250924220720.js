<script>
  const playBtn = document.getElementById("play-btn");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playBtn.innerHTML = '<i class="ri-play-fill"></i>'; // back to play icon
    } else {
      audio.play();
      playBtn.innerHTML = '<i class="ri-pause-fill"></i>'; // pause icon
    }
    isPlaying = !isPlaying;
  });
</script>
