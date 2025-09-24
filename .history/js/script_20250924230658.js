// Script for the play button in the header section
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

// Script for the spotlight cursor effect from Codepen
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const contact = document.querySelector(".contact__container");
  const cursor = contact.querySelector(".cursor");

  contact.addEventListener("mousemove", (evt) => {
    const rect = contact.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    gsap.set(cursor, { x: mouseX, y: mouseY });

    gsap.to(".contact__container .shape", {
      x: mouseX,
      y: mouseY,
      stagger: -0.1
    });
  });
</script>

// End of spotlight cursor effect script
