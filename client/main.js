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
  console.log("loop");
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
      roundEnd(players, turn, deck, tablePile);
    });
  }
  let tableEventNotAdded = true;
  let cardsToPlace = [];
  playerDiv.addEventListener("click", function placeCard(event) {
    if (event.target.className === "player-current-hand") {
      return;
    }
    const cardDiv = event.target;
    for (let card of player.deck) {
      if (
        cardDiv.whichCard === `${card.value} ${card.suit}` &&
        !cardsToPlace.includes(card)
      ) {
        cardDiv.style.color = "blue";
        cardsToPlace.push(card);
        player.deck.splice(
          player.deck.indexOf(cardsToPlace[cardsToPlace.length - 1]),
          1
        );
      }
    }
    const tableDiv = document.getElementById("table");

    if (tableEventNotAdded) {
      tableDiv.addEventListener("click", function drawCardPick(event) {
        let deckToDrawFrom;
        if (event.target.id === "table-deck") {
          deckToDrawFrom = deck;
        } else if (event.target.parentNode.id === "table-pile") {
          deckToDrawFrom = tablePile;
        } else return;
        player.drawCard(deckToDrawFrom);
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

window.addEventListener("DOMContentLoaded", newGame);
