// let { Player, Card, Deck } = require("./utiles");

let player1 = new Player("ilay");
let player2 = new Player("zohar");
let player3 = new Player("tomer");
let player4 = new Player("yair");

let deck = new Deck();
deck.shuffle();

deal([player1, player2, player3, player4], deck);

window.addEventListener("DOMContentLoaded", () => {
  printGameState([player1, player2, player3, player4]), deck;
});

function deal(players, deck) {
  for (let player of players) {
    for (let i = 0; i < 5; i++) {
      player.deck.push(deck.pop());
    }
  }
}

function printGameState(players, tableDeck) {
  for (let player of players) {
    let playerDiv = document.getElementById(
      `player${players.indexOf(player) + 1}`
    );
    let playerTitle = document.createElement("h2");
    playerTitle.className = "player-title";
    playerTitle.innerText = player.name;
    playerDiv.append(playerTitle);
    printPlayer(player, playerDiv);
  }
}

function printPlayer(player, playerDiv) {
  for (let card of player.deck) {
    playerDiv.append(printCard(card));
  }
  let pointsDiv = document.createElement("div");
  pointsDiv.className = "player-current-hand";
  pointsDiv.innerText = player.calcHandPoints();
  playerDiv.append(pointsDiv);
}

function printCard(card) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  let cardValue = card.value;
  if (card.value === 1) cardValue = "Ace";
  if (card.value === 11) cardValue = "Jack";
  if (card.value === 12) cardValue = "Queen";
  if (card.value === 13) cardValue = "King";
  let cardValueDiv = document.createElement("div");
  let cardSuitDiv = document.createElement("div");
  cardValueDiv.classList.add("card-value");
  cardSuitDiv.classList.add("card-suit");
  cardDiv.classList.add(cardColorClass(card));

  cardDiv.innerText = `${cardValue} of ${card.suit}`;

  return cardDiv;
}

function cardColorClass(card) {
  if (card.value === "Joker") {
    return `card-${card.suit}`;
  }
  if (card.suit === "clubs" || card.suit === "spades") {
    return `card-black`;
  }
  return `card-red`;
}
