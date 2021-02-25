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

// module.exports = { Player, Card, Deck };
