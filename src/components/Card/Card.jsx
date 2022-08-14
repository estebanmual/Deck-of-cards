import React from "react";
import style from "./Card.module.css";
import cardBack from "../../assets/backCard.jpg";

function Card({ card, moveCard }) {
  
  const flipCard = (e) => {
    const card = document.querySelector(`.${style.card__inner}`);
    e.target.classList.toggle(style.hide);
    e.target.nextSibling.classList.toggle(style.hide);
    card.classList.toggle(style.flip);
    const imgCard = document.getElementById("moveCard");
    setTimeout(() => {
      imgCard.style.display = "block";
    } , 500);
    
  };

  const dealCard = (e) => {
    const card = document.querySelector(`.${style.card__inner}`);
    card.style.display = "none";
    moveCard();
    e.target.classList.toggle(style.hide);
    setTimeout(() => {
      e.target.previousSibling.classList.toggle(style.hide);
      card.classList.toggle(style.flip);
      card.style.display = "block";
    }, 1000);
  };

  return (
    <>
      <button className={style.card__button} onClick={(e) => flipCard(e)}>FLIP</button>
      <button className={`${style.hide} ${style.card__button}`} onClick={(e) => dealCard(e)}>
        DEAL
      </button>
      <div className={style.card}>
        <div className={style.card__inner}>
          <div className={`${style.card__front} ${style.card__face}`}>
            <img src={cardBack} alt="card back" />
          </div>
          <div className={`${style.card__back} ${style.card__face}`}>
            {card ? <img src={card.image} alt="Card Front" /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
