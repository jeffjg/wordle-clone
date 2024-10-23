let form = document.querySelector(".guess-attempt");
let formInputs = form.getElementsByTagName("input");
let letterInputs = form.querySelectorAll(".letter-choice");
let container = document.getElementById("container");
let addParagraphButton = document.getElementById("addParagraph");

const gameState = {
  answer: "RHINO",
  correctLetters: new Set(),
  incorrectLetters: new Set(),
  attempts: 0,
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  handleGuessSubmission();
});

function handleGuessSubmission() {
  let guessedLetters = [];
  letterInputs.forEach((input) => {
    guessedLetters.push(input.value.toUpperCase());
  });
  compareGuessToAnswer(guessedLetters);
}

function compareGuessToAnswer(guessedLetters) {
  let answerLetters = gameState.answer.split("");

  guessedLetters.forEach((letter, index) => {
    let inputElement = letterInputs[index];
    // Correct letter in correct position
    if (letter === answerLetters[index]) {
      inputElement.classList.add("correct-position");
      gameState.correctLetters.add(letter);
    } else if (gameState.answer.includes(letter)) {
      inputElement.classList.add("incorrect-position");
    } else {
      inputElement.classList.add("incorrect-letter");
      gameState.incorrectLetters.add(letter);
    }
  });

  gameState.attempts += 1;
}

// My attempt at doing "GuessAttempt" class to generate multiple rows of the form...Needs lots of work, man :cry:
{
  class GuessAttempt {
    constructor() {
      this.paragraph = document.createElement("p");
      this.paragraph.textContent =
        "I'm a dog. You're a dog. We're all dogs, yay.";
    }

    handleGuess() {}

    appendToDOM() {
      container.append(this.paragraph);
    }
  }

  addParagraphButton.addEventListener("click", function () {
    let newAttempt = new GuessAttempt();
    newAttempt.appendToDOM();
  });
}

// Progresses the form forward when a user inputs a letter and backwards when user presses Backspace.
{
  Array.from(formInputs).forEach(function (input) {
    let letterGuess = input.classList.contains("letter-choice");
    input.addEventListener("keydown", (event) => {
      if (
        event.key.length === 1 &&
        event.key.match(/[a-zA-Z]/) &&
        letterGuess
      ) {
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
}
