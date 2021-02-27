function newGame() {
  let inputs = [];
  for (let i = 0; i < 4; i++) {
    let playerDiv = document.getElementById(`player${i}`);
    let playerInput = document.createElement("textarea");
    // playerInput.type = "text";
    playerInput.placeholder = `Player's \n name:`;
    playerInput.className = `player-input`;
    playerDiv.append(playerInput);
    inputs.push(playerInput);
  }
  let tableDiv = document.getElementById("table");
  let startBtn = document.createElement("button");
  let tableDeck = document.getElementById("table-deck");
  tableDeck.hidden = true;
  startBtn.id = "start-button";
  startBtn.innerText = "Start";
  tableDiv.append(startBtn);
  startBtn.addEventListener("click", () => {
    let exists = {};
    let players = [];
    for (let input of inputs) {
      if (!input.value || input.value === " ") {
        alert("all players must have names!");
        return;
      }
      if (exists[input.value]) {
        alert("Can't have 2 players with the same name");
        return;
      }
      exists[input.value] = true;
      players.push(new Player(input.value, inputs.indexOf(input)));
    }
    newRound(players);
    tableDiv.removeChild(startBtn);
    tableDeck.hidden = false;
  });
}

function newRound(players, starter = Math.floor(Math.random() * 4)) {
  let deck = new Deck();
  deck.shuffle();
  deal(players, deck);
  let tablePile = [];
  tablePile.push(deck.pop());

  for (player of players) {
    if (player.out) {
      deck.concat(player.deck);
      player.score = ":(";
    }
  }

  printGameState(players, deck, tablePile);
  playTurn(players, starter, deck, tablePile);
}

function playTurn(players, turn, deck, tablePile) {
  const player = players[turn];
  const playerDiv = document.getElementById(player.index);

  playerDiv.style.color = "red";

  if (player.out) {
    turn = turn === 3 ? 0 : turn + 1;
    playTurn(players, turn, deck, tablePile);
  }

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
        //chose which deck the player wishes to draw from
        let deckToDrawFrom;
        if (
          event.target.id === "new-round-button" ||
          cardsToPlace.length === 0
        ) {
          return;
        }
        if (event.target.id === "table-deck") {
          deckToDrawFrom = deck;
        } else if (event.target.parentNode.parentNode.id === "table-pile") {
          deckToDrawFrom = tablePile;
        } else return;
        //in case its the table-pile, decide if he wants to take the first or last
        let last;
        if (deckToDrawFrom === tablePile) {
          let boundClient = event.target.parentNode.parentNode.getBoundingClientRect();
          last = event.clientX < boundClient.left + boundClient.width / 2;
        }
        player.drawCard(deckToDrawFrom, last);

        //print updated game state
        printGameState(players, deck, cardsToPlace);
        tablePile.push(...cardsToPlace);
        turn = turn === 3 ? 0 : turn + 1;
        playerDiv.removeEventListener("click", placeCard);
        tableDiv.removeEventListener("click", drawCardPick);
        playerDiv.style.color = "black";

        //if table deck has ended, shuffle with table pile and keep going
        if (deck.length === 1) {
          deck.push(...tablePile);
          tablePile.push(deck.pop());
          deck.shuffle();
        }
        playTurn(players, turn, deck, tablePile);
      });
      tableEventNotAdded = false; // makes sure drawing event listener happens only once.
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
      player.out = true;
    }
  }
  printRoundEnd(players, yaniv, asaf);
}

window.addEventListener("DOMContentLoaded", newGame);
