document.addEventListener("DOMContentLoaded", function () {
  const choices = document.querySelectorAll(".choice"); // Alle keuze knoppen ophalen
  const humanChoiceOutput = document.getElementById("humanChoice"); // Element voor het weergeven van de menselijke keuze
  const computerChoiceOutput = document.getElementById("computerChoice"); // Element voor het weergeven van de computerkeuze
  const resultOutput = document.getElementById("result"); // Element voor het weergeven van het resultaat van de ronde
  const countdownOutput = document.getElementById("countdown"); // Element voor het weergeven van de aftelling
  const roundOutput = document.getElementById("round"); // Element voor het weergeven van het huidige rondenummer
  const highscoreOutput = document.getElementById("highscore"); // Element voor het weergeven van de hoogste score
  const streakOutput = document.getElementById("streak"); // Element voor het weergeven van de winstreak

  let round = 1; // Variabele voor het bijhouden van het huidige rondenummer
  let highscore = 0; // Variabele voor het bijhouden van de hoogste score
  let streak = 0; // Variabele voor het bijhouden van de winstreak
  let humanChoice = ""; // Variabele voor het bijhouden van de menselijke keuze
  let countdownInProgress = false; // Variabele om bij te houden of de aftelling bezig is

  // Event listener voor alle keuze knoppen
  choices.forEach((choice) => {
    choice.addEventListener("click", function () {
      // Als de countdown niet bezig is, start dan de countdown en het spel
      if (!countdownInProgress) {
        humanChoice = choice.dataset.choice; // Menselijke keuze vastleggen
        humanChoiceOutput.textContent = humanChoice; // Direct menselijke keuze weergeven
        startCountdown(); // Start de aftelling voor het tonen van het resultaat
      }
    });
  });

  // Functie voor het starten van de aftelling
  function startCountdown() {
    countdownInProgress = true; // Aftelling is bezig
    let countdown = 3; // Initiële waarde voor de aftelling
    countdownOutput.textContent = countdown; // Aftelling weergeven
    resultOutput.textContent = ""; // Vorig resultaat wissen
    computerChoiceOutput.textContent = ""; // Vorige computerkeuze wissen

    const countdownInterval = setInterval(() => {
      countdown--; // Aftelling verminderen
      countdownOutput.textContent = countdown; // Aftelling bijwerken

      if (countdown === 0) {
        clearInterval(countdownInterval); // Aftelling stoppen bij nul
        playGame(humanChoice); // Spel spelen na de aftelling
        countdownInProgress = false; // Aftelling is niet meer bezig
      }
    }, 1000); // Aftelling met interval van 1 seconde (1000 milliseconden)
  }

  // Functie voor het spelen van het spel
  function playGame(humanChoice) {
    // Computerkeuze genereren en weergeven
    const computerChoice = generateComputerChoice();
    computerChoiceOutput.textContent = computerChoice;

    // Winnaar bepalen
    determineWinner(humanChoice, computerChoice);

    // Rondenummer bijwerken
    round++;
    roundOutput.textContent = round;
  }

  // Functie voor het genereren van de computerkeuze
  function generateComputerChoice() {
    const choices = ["Steen", "Papier", "Schaar"]; // Mogelijke keuzes voor de computer
    const randomNumber = Math.floor(Math.random() * choices.length); // Willekeurig getal genereren binnen de lengte van de keuzes
    return choices[randomNumber]; // Willekeurige keuze retourneren
  }

  // Functie voor het bepalen van de winnaar
  function determineWinner(humanChoice, computerChoice) {
    setTimeout(() => {
      let result;
      if (humanChoice === computerChoice) {
        result = "Gelijkspel!"; // Gelijkspeel als menselijke keuze gelijk is aan computerkeuze
      } else {
        // Gebruik een switch-statement om de winnaar te bepalen
        switch (humanChoice) {
          case "Steen":
            result =
              computerChoice === "Schaar" ? "Je wint!" : "Computer wint!";
            break;
          case "Papier":
            result = computerChoice === "Steen" ? "Je wint!" : "Computer wint!";
            break;
          case "Schaar":
            result =
              computerChoice === "Papier" ? "Je wint!" : "Computer wint!";
            break;
        }
      }

      resultOutput.textContent = result; // Resultaat weergeven

      // Winstreak en highscore bijwerken
      if (result === "Je wint!") {
        streak++; // Winstreak verhogen
        if (streak > highscore) {
          highscore = streak; // Highscore bijwerken
          highscoreOutput.textContent = highscore; // Highscore weergeven
        }
      } else if (result === "Computer wint!") {
        streak = 0; // Winstreak resetten bij verlies
      }
      streakOutput.textContent = streak; // Winstreak weergeven

      // Resultaat loggen naar de console
      console.log(
        `Mens: ${humanChoice}, Computer: ${computerChoice} - ${result}`
      );
    }, 100); // Vertraging van 100 milliseconden om de DOM bij te werken
  }
});
