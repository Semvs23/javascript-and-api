// Wacht tot de DOM volledig is geladen voordat het script wordt uitgevoerd
document.addEventListener("DOMContentLoaded", function () {
  // Selecteert de knoppen en uitvoerelementen uit de HTML op basis van hun ID's
  const steenKnop = document.getElementById("steen");
  const papierKnop = document.getElementById("papier");
  const schaarKnop = document.getElementById("schaar");
  const menselijkeKeuzeUitvoer = document.getElementById("menselijkeKeuze");
  const computerKeuzeUitvoer = document.getElementById("computerKeuze");

  // Voegt klikgebeurtenisluisteraars toe aan de knoppen en bindt de speelSpel functie met de overeenkomstige keuze
  steenKnop.addEventListener("click", function () {
    speelSpel("Steen");
  });

  papierKnop.addEventListener("click", function () {
    speelSpel("Papier");
  });

  schaarKnop.addEventListener("click", function () {
    speelSpel("Schaar");
  });

  // Functie die de spel logica afhandelt wanneer een keuze is gemaakt
  function speelSpel(menselijkeKeuze) {
    // Geeft de keuze van de mens weer in het aangewezen uitvoerelement
    menselijkeKeuzeUitvoer.textContent = menselijkeKeuze;
    // Genereert de keuze van de computer en geeft deze weer
    let computerKeuze = genereerComputerKeuze();
    computerKeuzeUitvoer.textContent = computerKeuze;
    // Bepaalt de winnaar op basis van de keuzes van de mens en de computer
    bepaalWinnaar(menselijkeKeuze, computerKeuze);
  }

  // Functie die willekeurig de keuze van de computer selecteert
  function genereerComputerKeuze() {
    const keuzes = ["Steen", "Papier", "Schaar"];
    // Genereert een willekeurig nummer tussen 0 en 2 om een van de keuzes te selecteren
    const willekeurigNummer = Math.floor(Math.random() * keuzes.length);
    return keuzes[willekeurigNummer];
  }

  // Functie die de winnaar van het spel bepaalt
  function bepaalWinnaar(menselijkeKeuze, computerKeuze) {
    setTimeout(() => {
      // Controleert of het spel gelijkspel is
      if (menselijkeKeuze === computerKeuze) {
        alert("Het is een gelijkspel!");
        console.log(
          `Mens: ${menselijkeKeuze}, Computer: ${computerKeuze} - Het is een gelijkspel!`
        );
        // Controleert of de mens wint
      } else if (
        (menselijkeKeuze === "Steen" && computerKeuze === "Schaar") ||
        (menselijkeKeuze === "Papier" && computerKeuze === "Steen") ||
        (menselijkeKeuze === "Schaar" && computerKeuze === "Papier")
      ) {
        alert("Je wint!");
        console.log(
          `Mens: ${menselijkeKeuze}, Computer: ${computerKeuze} - Je wint!`
        );
        // Als geen van de bovenstaande voorwaarden waar is, wint de computer
      } else {
        alert("Computer wint!");
        console.log(
          `Mens: ${menselijkeKeuze}, Computer: ${computerKeuze} - Computer wint!`
        );
      }
    }, 100); // Vertraagt de alert met 100 milliseconden om ervoor te zorgen dat de DOM wordt bijgewerkt met de keuzes
  }
});
