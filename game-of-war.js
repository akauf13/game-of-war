class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
    // this.playerOne = []
    // this.playerTwo = []
    this.shuffle();
  }

  createDeck() {
    let suits = ["Heart", "Spade", "Club", "Diamond"];
    let ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], j + 2));
      }
    }

    return this.cards;
  }

  shuffle() {
    let currentIndex = this.cards.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }

    return this.cards;
  }
}

class GameOfWar {
  constructor() {
    this.playerOne = [];
    this.playerTwo = [];
    this.table = [];
    this.gameSetup();
    this.draw();
  }

  gameSetup() {
    const deck = new Deck();
    let cards = deck.cards;

    //Split the deck for each player
    this.playerOne.push(...cards.slice(0, cards.length / 2));
    this.playerTwo.push(...cards.slice(cards.length / 2));
  }

  draw() {
    //game play of comparing cards until 4 cards left in one deck
    // compare cards at top of deck 
    while (this.playerOne.length > 0 && this.playerTwo.length > 0) {
      // check if "compare cards tie"
      if (this.playerOne.at(-1).score === this.playerTwo.at(-1).score) {
        if (this.playerOne.length > 4 && this.playerTwo.length > 4) {
          //Declare War
          this.table.push(this.playerOne.pop());
          this.table.push(this.playerTwo.pop());
          this.table.push(this.playerOne.pop());
          this.table.push(this.playerTwo.pop());
          this.table.push(this.playerOne.pop());
          this.table.push(this.playerTwo.pop());
          this.table.push(this.playerOne.pop());
          this.table.push(this.playerTwo.pop());
          // this.draw()
        }
        else if (this.playerOne.length < 4) {
          this.playerTwo.unshift(...this.playerOne)
          this.playerTwo.unshift(...this.table)
          this.playerOne.length = 0
          this.table.length = 0
          // console.log("Player Two Wins!");
          // break
        }
        
        else {
          this.playerOne.unshift(...this.playerTwo)
          this.playerOne.unshift(...this.table)
          this.playerTwo.length = 0
          this.table.length = 0
          // console.log("Player One Wins!");
          // break
        }
        //
      }
      else if (this.playerOne.at(-1).score > this.playerTwo.at(-1).score) {
        //Player one wins round
        this.table.push(this.playerOne.pop());
        this.table.push(this.playerTwo.pop());
        this.playerOne.unshift(...this.table)
        this.table.length = 0
      }
      else if (this.playerTwo.at(-1).score > this.playerOne.at(-1).score) {
        //Player two wins round
        this.table.push(this.playerOne.pop());
        this.table.push(this.playerTwo.pop());
        this.playerTwo.unshift(...this.table)
        this.table.length = 0
      }
      
    }

    if (this.playerOne.length === 0) {
      console.log("Player Two Wins!", this.playerTwo.length);
      
    }
    else if (this.playerTwo.length === 0) {
      console.log("Player One Wins!", this.playerOne.length);
    }
  }
}

let game = new GameOfWar();
console.log(game);

// let gamblerDeck = new Deck();
