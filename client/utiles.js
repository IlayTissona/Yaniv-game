class Card {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }
}

class player {
  constructor(name, deck) {
    this.name = name;
    this.deck = deck;
    this.points = 0;
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
}
