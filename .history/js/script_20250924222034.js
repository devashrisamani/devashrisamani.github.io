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

import { DotLottie } from "@lottiefiles/dotlottie-web";

const dotLottie = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#dotlottie-canvas"),
  src: "<https://lottie.host/5654fc47-ca3e-486f-ba01-83120598f8a1/T1AEfTyJsq.lottie>", // replace with your .lottie or .json file URL
});
