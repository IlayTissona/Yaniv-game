// let { Player, Card, Deck } = require("./utiles");

let player1 = new Player("ilay");
let player2 = new Player("zohar");
let player3 = new Player("tomer");
let player4 = new Player("yair");

let deck = new Deck();
deck.shuffle();

deal([player1, player2, player3, player4], deck);

console.log([player1, player2, player3, player4], deck);

function deal(players, deck) {
  for (let player of players) {
    for (let i = 0; i < 5; i++) {
      player.deck.push(deck.pop());
    }
  }
}
