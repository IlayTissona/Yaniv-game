// let { Player, Card, Deck } = require("./utiles");

let players = [
  new Player("ilay"),
  new Player("zohar"),
  new Player("tomer"),
  new Player("yair"),
];

let deck = new Deck();
deck.shuffle();

deal(players, deck);

window.addEventListener("DOMContentLoaded", () => {
  printGameState(players, deck);
});

function newRound(players) {}
