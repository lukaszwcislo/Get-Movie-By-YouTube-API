function countdownAnimationMovie() {
  const animationWrapper = document.querySelector(".animation-box");
  const moviesList = document.querySelector(".movies-list ul");
  const inputMovie = document.querySelector(".input-movie");
  const inputSubmit = document.querySelector(".input-submit");
  const form = document.querySelector("form");
  const alertBox = document.querySelector(".alert");
  let moviesListItems = document.querySelectorAll(".movies-list ul li");
  let getInputValueID;
  let getInputValue;
  let isItemAdded = false;
  let revertCurrentTime;

  animationWrapper.style.visibility = "hidden";
  inputSubmit.disabled = true;

  function checkIfMovieExists() {
    console.log("Movie duration: " + player.getDuration());
    if (player.getDuration() === 0) {
      alertBox.textContent =
        "Film nie istnieje, lub podano błedny adres URL !!!";
      alertBox.classList.add("active");
      setTimeout(hideAlert, 2000);
      document.querySelector(".movies-list ul li:last-of-type").remove();
      inputSubmit.disabled = true;
      moviesListItems = document.querySelectorAll(".movies-list ul li");
    }
  }

  function getMovie() {
    inputMovie.addEventListener("input", (e) => {
      getInputValueID = e.target.value.replace(/.*?v=/, "").replace(/&.*/, "");
      console.log(`ID: ${getInputValueID}`);
      if (e.target.value === "") {
        inputSubmit.disabled = true;
      } else {
        inputSubmit.disabled = false;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      inputMovie.value = "";
      if (isItemAdded === false) {
        player.loadVideoById(getInputValueID);
        console.log(`Duration: ${player.getDuration()}`);
        setTimeout(checkCurrentTime, 1000);
        inputSubmit.disabled = true;
      }

      setTimeout(checkIfMovieExists, 1000);
    });
  }

  function checkCurrentTime() {
    const animationTarget = document.querySelector(".animation-box span");

    function displayCurrentTime() {
      let totalTime = player.getDuration();
      let currentTime = player.getCurrentTime();
      revertCurrentTime = totalTime - currentTime;

      if (revertCurrentTime > 11) {
        animationWrapper.style.visibility = "hidden";
      } else {
        animationWrapper.style.visibility = "visible";
      }

      animationTarget.textContent = Math.floor(revertCurrentTime);
    }

    setInterval(displayCurrentTime, 1000);
  }

  function hideAlert() {
    alertBox.classList.remove("active");
  }

  function addMovieToTheList() {
    inputMovie.addEventListener("input", (e) => {
      getInputValue = e.target.value;
    });

    form.addEventListener("submit", () => {
      moviesListItems.forEach((e) => {
        if (e.getAttribute("data-value") === getInputValue) {
          isItemAdded = true;
          alertBox.textContent = "Podany link, jest już w kolejce !";
          alertBox.classList.add("active");
          setTimeout(hideAlert, 2000);
        }
      });

      if (isItemAdded === false) {
        moviesList.innerHTML += `<li data-value="${getInputValue}">${getInputValue}</li>`;
        loadMovieFromList();
      }

      isItemAdded = false;
    });
  }

  function loadMovieFromList() {
    moviesListItems = document.querySelectorAll(".movies-list ul li");
    moviesListItems.forEach(function (e) {
      e.addEventListener("click", function (e) {
        player.loadVideoById(
          this.getAttribute("data-value")
            .replace(/.*?v=/, "")
            .replace(/&.*/, "")
        );
      });
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    getMovie();
    addMovieToTheList();
    loadMovieFromList();
  });
}

countdownAnimationMovie();
