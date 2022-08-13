import React, { useEffect, useState } from "react";
import style from "./Board.module.css";
import PokerDeck from "../PokerDeck/PokerDeck";
import EndGame from "../EndGame/EndGame";
import hearts from "../../assets/hearts.png";
import spades from "../../assets/spades.png";
import diamonds from "../../assets/diamonds.png";
import clubs from "../../assets/clubs.png";
import fairPlay from "../../assets/fairPlay.png";

const values = new Map([
  ["2", 2],
  ["3", 3],
  ["4", 4],
  ["5", 5],
  ["6", 6],
  ["7", 7],
  ["8", 8],
  ["9", 9],
  ["10", 10],
  ["JACK", 11],
  ["QUEEN", 12],
  ["KING", 13],
  ["ACE", 14],
]);

const insertionSort = (arr) => {
        let insertNumber = arr.length - 1;
        let compareNumber = insertNumber - 1;
        let temp = arr[insertNumber];
        let counter = 0;

        while (compareNumber >= 0 && arr[compareNumber] > arr[compareNumber + 1]) {
            arr[compareNumber] = arr[compareNumber + 1];
            arr[compareNumber + 1] = temp;
            compareNumber -= 1;
            counter += 1;
        }

        return arr.length - counter;
}

const piles = [
    { suit: "HEARTS", cards: [], suitIMG: hearts },
    { suit: "SPADES", cards: [], suitIMG: spades },
    { suit: "DIAMONDS", cards: [], suitIMG: diamonds },
    { suit: "CLUBS", cards: [], suitIMG: clubs },
  ];

export default function Board() {
  const [deckID, setDeckID] = useState(null);
  const [card, setCard] = useState(null);
  const [cardSelectedCounter, setCardSelectedCounter] = useState(0);
  const selectedCard = "QUEEN";
  

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => res.json())
      .then((data) => {
        setDeckID(data.deck_id);
      });
  }, []);

  const newCard = () => {
    if (deckID)
      fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then((res) => res.json())
        .then((data) => {
          setCard(data.cards[0]);
        });
  };

  useEffect(() => {
    newCard();
  }, [deckID]);

  const saveCard = () => {
    const pile = piles.find((pile) => pile.suit === card.suit).cards;
    const pileValues = pile.map((card) => values.get(card.value));
    const cardValue = values.get(card.value);
    const insertionIndex = insertionSort([...pileValues, cardValue]);
    pile.splice(insertionIndex - 1, 0, card);
    if (card.value === selectedCard) {
      setCardSelectedCounter(cardSelectedCounter + 1);
    }
  };

  return (
    <div className={style.board}>
      <EndGame />
      <div className={style.piles}>
        {piles.map((pile, index) => (
          <div className={style.pile} id={`${pile.suit}__pile`} key={index}>
            <img src={pile.suitIMG} alt="" />
            <div className={style.pile__cards}>
              <div className={style.pile__box} id={`${pile.suit}__box`}>
                <img className={style.pile__box_fairPlay} src={fairPlay} alt="FairPLay" />
              </div>
              <div className={style.cards}>
              {pile.cards.map((card, index) => (

                card.value === selectedCard ?
                    <img className={`${style.pile__card} ${style.selectedCard}`} src={card.image} alt="Card" key={index} /> : <img className={style.pile__card} src={card.image} alt="Card" key={index} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <PokerDeck
        card={card}
        newCard={() => newCard()}
        saveCard={() => saveCard()}
      />
    </div>
  );
}
