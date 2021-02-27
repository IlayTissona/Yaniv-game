class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

class Player {
  constructor(name, index) {
    this.name = name;
    this.index = "player" + index;
    this.deck = [];
    this.score = 0;
  }

  calcHandPoints() {
    let points = 0;
    for (let card of this.deck) {
      if (card.value === "Joker") {
        points += 0;
      } else if (card.value <= 10) {
        points += card.value;
      } else {
        points += 10;
      }
    }
    return points;
  }

  drawCard(deckToDrawFrom, last = false) {
    if (last) {
      let tablePileDiv = document.getElementById("table-pile");
      let cardsInPile = tablePileDiv.childNodes.length;
      this.deck.push(deckToDrawFrom[deckToDrawFrom.length - cardsInPile]);
      deckToDrawFrom.splice(deckToDrawFrom.length - cardsInPile, 1);
    } else {
      this.deck.push(deckToDrawFrom.pop());
    }
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
    player.deck = [];
    for (let i = 0; i < 5; i++) {
      player.deck.push(deck.pop());
    }
  }
}

function printGameState(players, tableDeck, tablePile) {
  for (let player of players) {
    let playerDiv = document.getElementById(player.index);
    playerDiv.style.color = "black";
    playerDiv.innerHTML = "";
    let playerTitle = document.createElement("h2");
    playerTitle.className = "player-title";
    playerTitle.innerText = player.name;
    playerDiv.append(playerTitle);
    printPlayer(player, playerDiv);
  }

  let tablePileDiv = document.getElementById("table-pile");
  tablePileDiv.innerText = "";

  for (let card of tablePile) {
    tablePileDiv.append(printCard(card));
  }
  let deckDiv = document.getElementById("table-deck");
  deckDiv.innerText = tableDeck.length;
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
  cardDiv.whichCard = `${card.value} ${card.suit}`;
  let cardValue = card.value;
  if (card.value === 1) cardValue = "A";
  if (card.value === 11) cardValue = "J";
  if (card.value === 12) cardValue = "Q";
  if (card.value === 13) cardValue = "K";
  let imgPath;
  if (card.value === "Joker") {
    imgPath = `./styles/cards-svg/Joker${card.suit}.svg`;
  } else {
    imgPath = `./styles/cards-svg/${cardValue}${card.suit[0].toUpperCase()}.svg`;
  }
  let imgElem = document.createElement("img");
  imgElem.src = imgPath;
  imgElem.style.height = "150px";
  imgElem.style.width = "100px";

  cardDiv.append(imgElem);

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

function isLegalCard(card, drawn) {
  if (drawn.length === 0) {
    return true;
  }
  let isLegal = false;
  let minusFirst = card.value - drawn[0].value;
  let minusLast = card.value - drawn[drawn.length - 1].value;

  if (
    card.value === drawn[0].value &&
    card.value === drawn[drawn.length - 1].value
  ) {
    isLegal = true;
  } else if (
    card.suit === drawn[0].suit &&
    (minusFirst === 1 || minusFirst === -1)
  ) {
    isLegal = true;
  } else if (
    card.suit === drawn[0].suit &&
    (minusLast === 1 || minusLast === -1)
  ) {
    isLegal = true;
  }
  return isLegal;
}

function printRoundEnd(players, yaniv, asaf) {
  for (i in players) {
    let playerDiv = document.getElementById(players[i].index);
    playerDiv.innerText = players[i].name + "\n";
    if (Number(i) === asaf) {
      let asafDiv = document.createElement("div");
      asafDiv.id = "asaf-div";
      asafDiv.innerText = "Congratulations, asaf!!";
      playerDiv.append(asafDiv);
    }
    if (Number(i) === yaniv) {
      let yanivDiv = document.createElement("div");
      yanivDiv.id = "yaniv-div";
      yanivDiv.innerText = "Congratulations, Yaniv!";
      if (asaf !== false) {
        yanivDiv.className = "yaniv-asaf";
        yanivDiv.innerText = "Tough luck my friend, maybe next time";
      }
      playerDiv.append(yanivDiv);
    }
    let scoreDiv = document.createElement("div");
    scoreDiv.className = "score-div";
    scoreDiv.innerText = players[i].score;
    playerDiv.append(scoreDiv);
  }
  let tableDiv = document.getElementById("table");

  for (let pile of tableDiv.childNodes) {
    pile.innerText = "";
  }
  let tableDeckDiv = document.getElementById("table-deck");
  tableDeckDiv.hidden = true;
  let newRoundBtn = document.createElement("button");
  newRoundBtn.id = "new-round-button";
  newRoundBtn.innerText = "Moving on to the next round!";
  tableDiv.append(newRoundBtn);

  newRoundBtn.addEventListener("click", () => {
    tableDeckDiv.hidden = false;
    newRound(players, asaf !== false ? asaf : yaniv);
    tableDiv.removeChild(newRoundBtn);
  });
}
