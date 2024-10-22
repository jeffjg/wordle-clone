let guessAttempt = document.querySelector(".guess-attempt");
let guessInputs = guessAttempt.getElementsByTagName("input");

// Progresses the form forward when a user inputs a letter and backwards when user presses Backspace.
Array.from(guessInputs).forEach(function (input) {
  let letterGuess = input.classList.contains("letter-choice");
  input.addEventListener("keydown", (event) => {
    if (event.key.length === 1 && event.key.match(/[a-zA-Z]/) && letterGuess) {
      input.value = event.key.toUpperCase();
      event.preventDefault();
      if (input.nextElementSibling) {
        input.nextElementSibling.focus();
      }
    }

    if (event.key === "Backspace") {
      if (input.value !== "" && letterGuess) {
        input.value = "";
        event.preventDefault();
      } else {
        if (input.previousElementSibling) {
          input.previousElementSibling.focus();
        }
      }
    }
  });
});
