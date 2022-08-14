import React from "react";
import Card from "../Card/Card";
import style from "./PokerDeck.module.css";
import backCard from "../../assets/backCard.jpg";

function PokerDeck(props) {
  const { card, newCard, saveCard, cardCounter } = props;
  const moveCard = () => {
    const moveCard = document.getElementById("moveCard");
    const moveCardPos = document
      .getElementById("moveCard")
      .getBoundingClientRect();

    const pile = document
      .getElementById(`${card.suit}__pile`)
      .getBoundingClientRect();
    const box = document
      .getElementById(`${card.suit}__box`)
      .getBoundingClientRect();

    const moveX = -moveCardPos.left - pile.left + (box.left - pile.left) + 20;
    const moveY = -moveCardPos.top + box.top - 130;

    moveCard.style.height = "170px";
    moveCard.style.width = "120px";
    moveCard.style.opacity = "0";
    moveCard.style.zIndex = "2";
    moveCard.style.transform = `translate(${moveX}px, ${moveY}px)`;
    setTimeout(() => {
      saveCard(card);
      if (cardCounter !== 52) {
        newCard();
      }
      moveCard.style.display = "none";
      clearCard(moveCard);
    } , 1000);
  };

  const clearCard = (card) => {
    card.style.height = '300px';
    card.style.width = '200px';
    card.style.opacity = "1";
    card.style.zIndex = "-1";
    card.style.transform = null;
  }

  return (
    <>
      <div className={style.deck}>
       {52 - cardCounter === 0 ? null: <Card card={card} moveCard={() => moveCard()}/>}
      </div>
      
      {card ? (
        <img
          id="moveCard"
          className={style.cardFlipped}
          src={card.image}
          alt="Card"
        />
      ) : (
        <img
          id="moveCard"
          className={style.cardFlipped}
          src={backCard}
          alt="Card"
        />
      )}
    </>
  );
}

export default PokerDeck;
