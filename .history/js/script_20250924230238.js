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
document.body.addEventListener("mousemove", (evt) => {
  const mouseX = evt.clientX;
  const mouseY = evt.clientY;

  gsap.set(".cursor", {
    x: mouseX,
    y: mouseY,
  });

  gsap.to(".shape", {
    x: mouseX,
    y: mouseY,
    stagger: -0.1,
  });
});
// End of spotlight cursor effect script
