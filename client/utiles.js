class Card {
  constructor(type, number) {
    this.type = type;
    this.number = number;
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
      if (card.number === "joker") {
        points += 0;
      } else if (card.number <= 10) {
        points += card.number;
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
            card.type = "hearts";
            break;
          case 1:
            card.type = "diamonds";
            break;
          case 2:
            card.type = "spades";
            break;
          case 3:
            card.type = "clubs";
            break;
        }
        this.push(card);
      }
    }
    this.push(new Card("red", "joker"));
    this.push(new Card("black", "joker"));
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
