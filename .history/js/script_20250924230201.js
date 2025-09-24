<!-- GSAP first -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- your play/pause + cursor code AFTER GSAP -->
<script>
  // Play button
  const playBtn = document.getElementById("play-btn");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  if (playBtn && audio) {
    playBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="ri-play-fill"></i>';
      } else {
        audio.play();
        playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
      }
      isPlaying = !isPlaying;
    });
  }

  // Cursor only inside header
  const header = document.querySelector(".header__container");
  const cursor = header?.querySelector(".cursor");

  header?.addEventListener("mousemove", (evt) => {
    const rect = header.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    gsap.set(cursor, { x, y });
    gsap.to(".header__container .shape", { x, y, stagger: -0.1 });
  });

  // When the mouse leaves the header, show normal cursor again on body
  header?.addEventListener("mouseleave", () => {
    // no-op; since cursor:none is scoped to header, body remains normal
  });
</script>

<!-- Lottie web component (keep this single include) -->
<script src="https://unpkg.com/@lottiefiles/dotlottie-wc/dist/dotlottie-wc.js" type="module"></script>
