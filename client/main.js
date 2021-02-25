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
  let tableDeck = deck.pop();

  //   do {
  printGameState(players, deck);
  console.log("loop");
  setTimeout(() => {
    ended = playTurn(players[turn], deck, tableDeck);
    turn = turn === 3 ? 0 : turn + 1;
  }, 20000);
  //   } while (!ended);
}

function playTurn(player, deck, tableDeck) {
  const playerDiv = document.getElementById(player.index);
  let yanived = false;
  if (player.calcHandPoints() < 7) {
    let yanivButton = document.createElement("button");
    yanivButton.value = "Yaniv!";
    yanivButton.addEventListener("click", () => {
      yanived = true;
    });
  }
  playerDiv.addEventListener("click", function placeCard(event) {
    const cardDiv = event.target;
    let cardToPlace;
    for (let card of player.deck) {
      if ((cardDiv.whichCard = `${card.value} ${card.suit}`)) {
        cardToPlace = card;
        player.deck.splice(player.deck.indexOf(cardToPlace), 1);
      }
    }
    cardDiv.hidden = true;
    tableDeck.push(cardToPlace);
  });
  return yanived;
}

window.addEventListener("DOMContentLoaded", newGame);
