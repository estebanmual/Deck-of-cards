import React from "react";
import { piles } from "../Board/Board";
import style from "./EndGame.module.css";

function EndGame({ cardCounter, newGame}) {
  return (
    <div className={style.endGame}>
      <div className={style.endGame__content}>
        <div className={style.endGame__info}>
            <h1>DECK OF CARDS</h1>
            <p>You found all of the QUEENS in only {cardCounter} moves!</p>
        </div>
        <div>
          {piles.map((pile, index) => (
            <div className={style.pile} key={index}>
                {pile.cards.map((card, index) => (
                    <img
                    className={style.endGame__card}
                    src={card.image}
                    alt="Card"
                    key={index}
                    />
                ))}
            </div>
          ))}
        </div>
        <button onClick={() => newGame()} className={style.endGame__NewGame}>START A NEW GAME</button>
      </div>
    </div>
  );
}

export default EndGame;
