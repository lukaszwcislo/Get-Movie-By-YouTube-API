function countdownAnimationMovie() {
  const animationWrapper = document.querySelector(".animation-box");
  animationWrapper.style.visibility = "hidden";

  function getMovie() {
    const inputMovie = document.querySelector(".input-movie");
    const form = document.querySelector("form");

    let getInputValue;

    inputMovie.addEventListener("input", (e) => {
      getInputValue = e.target.value.split("?v=")[1];
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      player.loadVideoById(getInputValue);
      setTimeout(checkCurrentTime, 1000);
    });
  }

  function checkCurrentTime() {
    const animationTarget = document.querySelector(".animation-box span");

    function dislayCurrentTime() {
      let totalTime = player.getDuration();
      let currentTime = player.getCurrentTime();
      let revertCurrentTime = totalTime - currentTime;

      if (revertCurrentTime > 11) {
        animationWrapper.style.visibility = "hidden";
      } else {
        animationWrapper.style.visibility = "visible";
      }

      animationTarget.textContent = Math.floor(revertCurrentTime);
    }

    setInterval(dislayCurrentTime, 1000);
  }

  window.addEventListener("DOMContentLoaded", () => {
    getMovie();
  });
}

countdownAnimationMovie();
