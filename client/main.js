function newGame() {
  let players = [
    new Player("ilay", 0),
    new Player("zohar", 1),
    new Player("tomer", 2),
    new Player("yair", 3),
  ];

  newRound(players, 0);
}

function newRound(
  players,
  roundNum = 0,
  starter = Math.floor(Math.random() * 4)
) {
  let ended = false;
  let deck = new Deck();
  let turn = starter;
  deck.shuffle();
  deal(players, deck);
  let tableDeck = [];
  tableDeck.push(deck.pop());

  printGameState(players, deck);
  console.log("loop");
  playTurn(players, turn, deck, tableDeck);
  //   turn = turn === 3 ? 0 : turn + 1;
}

function playTurn(players, turn, deck, tableDeck) {
  const player = players[turn];
  const playerDiv = document.getElementById(player.index);
  console.log(tableDeck);
  if (player.calcHandPoints() <= 7) {
    let yanivButton = document.createElement("button");
    playerDiv.append(yanivButton);
    yanivButton.innerText = "Yaniv!";
    yanivButton.addEventListener("click", () => {
      yanived = true;
    });
  }
  playerDiv.addEventListener("click", function placeCard(event) {
    if (event.target.className === "player-current-hand") {
      return;
    }
    const cardDiv = event.target;
    console.log(cardDiv.whichCard);
    let cardToPlace;
    for (let card of player.deck) {
      if (cardDiv.whichCard === `${card.value} ${card.suit}`) {
        cardToPlace = card;
        console.log(cardDiv.whichCard);
        console.log(`${card.value} ${card.suit}`);
        console.log(cardToPlace);
        console.log(player.deck.indexOf(cardToPlace));
        player.deck.splice(player.deck.indexOf(cardToPlace), 1);
      }
    }
    // cardDiv.hidden = true;
    printGameState(players, deck);
    tableDeck.push(cardToPlace);
    turn = turn === 3 ? 0 : turn + 1;
    playerDiv.removeEventListener("click", placeCard);
    playTurn(players, turn, deck, tableDeck);
  });
  //   return yanived;
}

window.addEventListener("DOMContentLoaded", newGame);
