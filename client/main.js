function newGame() {
  let players = [
    new Player("ilay", 0),
    new Player("zohar", 1),
    new Player("tomer", 2),
    new Player("yair", 3),
  ];

  newRound(players);
}

function newRound(players, starter = Math.floor(Math.random() * 4)) {
  let deck = new Deck();
  let turn = starter;
  deck.shuffle();
  deal(players, deck);
  let tablePile = [];
  tablePile.push(deck.pop());

  printGameState(players, deck, tablePile);
  playTurn(players, turn, deck, tablePile);
}

function playTurn(players, turn, deck, tablePile) {
  const player = players[turn];
  const playerDiv = document.getElementById(player.index);

  playerDiv.style.color = "red";

  if (player.calcHandPoints() <= 7) {
    let yanivButton = document.createElement("button");
    playerDiv.append(yanivButton);
    yanivButton.innerText = "Yaniv!";
    yanivButton.addEventListener("click", () => {
      roundEnd(players, turn);
    });
  }

  let tableEventNotAdded = true;
  let cardsToPlace = [];

  playerDiv.addEventListener("click", function placeCard(event) {
    if (
      event.target.innerText === "Yaniv!" ||
      event.target.parentNode.className !== "card"
    ) {
      return;
    }

    const cardDiv = event.target.parentNode; //because in each card div there is an image
    //if/else toggle pick/unpick card
    if (cardDiv.picked) {
      for (let card of cardsToPlace) {
        if (cardDiv.whichCard === `${card.value} ${card.suit}`) {
          cardDiv.style.filter = "brightness(100%)";
          cardDiv.picked = false;
          cardsToPlace.splice(cardsToPlace.indexOf(card), 1);
          player.deck.push(card);
        }
      }
    } else {
      for (let card of player.deck) {
        if (
          cardDiv.whichCard === `${card.value} ${card.suit}` &&
          !cardsToPlace.includes(card) &&
          isLegalCard(card, cardsToPlace)
        ) {
          cardDiv.style.filter = "brightness(50%)";
          cardDiv.picked = true;
          cardsToPlace.push(card);
          player.deck.splice(
            player.deck.indexOf(cardsToPlace[cardsToPlace.length - 1]),
            1
          );
        }
      }
    }

    const tableDiv = document.getElementById("table");

    if (tableEventNotAdded) {
      tableDiv.addEventListener("click", function drawCardPick(event) {
        let deckToDrawFrom;
        if (event.target.id === "table-deck") {
          deckToDrawFrom = deck;
        } else if (event.target.parentNode.parentNode.id === "table-pile") {
          deckToDrawFrom = tablePile;
        } else return;
        let last;
        if (deckToDrawFrom === tablePile) {
          let boundClient = event.target.parentNode.getBoundingClientRect();
          last = event.clientX < boundClient.left + boundClient.width / 2;
        }
        player.drawCard(deckToDrawFrom, last);
        printGameState(players, deck, cardsToPlace);
        tablePile.push(...cardsToPlace);
        turn = turn === 3 ? 0 : turn + 1;
        playerDiv.removeEventListener("click", placeCard);
        tableDiv.removeEventListener("click", drawCardPick);
        playerDiv.style.color = "black";
        if (deck.length === 1) {
          deck.push(...tablePile);
          tablePile.push(deck.pop);
          deck.shuffle();
        }
        playTurn(players, turn, deck, tablePile);
      });
      tableEventNotAdded = false;
    }
  });
}

function roundEnd(players, yaniv) {
  let winnerPoints = players[yaniv].calcHandPoints();
  let asaf = false;
  for (const player of players) {
    if (
      player.calcHandPoints() <= winnerPoints &&
      player.name !== players[yaniv].name
    ) {
      asaf = players.indexOf(player);
    }
  }
  console.log(`asaf ${asaf}`);
  console.log(`yaniv ${yaniv}`);
  for (const player of players) {
    if (player === players[yaniv]) {
      player.score =
        asaf !== false
          ? player.score + 30 + player.calcHandPoints()
          : player.score;
    } else if (players.indexOf(player) === asaf) {
      player.score += 0;
    } else {
      player.score += player.calcHandPoints();
    }

    if (player.score === 200) {
      player.score = 0;
    }

    if (player.score > 200) {
      players.splice(players.indexOf(player), 1);
    }

    console.log(player);
  }
  confirm("whenever you are ready to start again");
  newRound(players, asaf !== false ? asaf : yaniv);
}

window.addEventListener("DOMContentLoaded", newGame);
