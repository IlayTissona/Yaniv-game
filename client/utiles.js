class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.deck = [];
    this.points = 0;
    this.score = 0;
  }

  calcHandPoints() {
    let points = 0;
    for (let card of this.deck) {
      if (card.value === "joker") {
        points += 0;
      } else if (card.value <= 10) {
        points += card.value;
      } else {
        points += 10;
      }
    }
    return points;
  }
}

class Deck extends Array {
  constructor() {
    super();
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 4; j++) {
        let card = new Card(null, i + 1);
        switch (j) {
          case 0:
            card.suit = "hearts";
            break;
          case 1:
            card.suit = "diamonds";
            break;
          case 2:
            card.suit = "spades";
            break;
          case 3:
            card.suit = "clubs";
            break;
        }
        this.push(card);
      }
    }
    this.push(new Card("red", "Joker"));
    this.push(new Card("black", "Joker"));
  }
  shuffle() {
    let exists = [];
    let shuffled = [];
    for (let i = 0; i < this.length; i++) {
      let rand;
      do {
        rand = Math.floor(Math.random() * this.length);
      } while (exists[rand]);
      exists[rand] = true;
      shuffled.push(this[rand]);
    }
    for (let i = 0; i < shuffled.length; i++) {
      this.shift();
      this.push(shuffled[i]);
    }
  }
}

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

// module.exports = { Player, Card, Deck };
