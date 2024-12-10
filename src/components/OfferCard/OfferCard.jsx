import React from "react";
import './OfferCard.css'
import Chip from '../Chip/Chip'

const OfferCard = () => {
  return <div className="offer-card">
    <div className="offer-card__image">
      <img src="" alt="img" />
      <Chip kind="profit">ВЫГОДА</Chip>
      <Chip kind="sale">-30%</Chip>
    </div>
    <div className="offer-card__info">
      <h2 class="offer-card__title">Название компании</h2>
      <p>Описание компании</p>
    </div>
    <div className="offer-card__tags">
      <div className="offer-card__tags_wrap">
        <div className="offer-card__tags_location">
          <Chip kind="city">Город, местонахождение</Chip>
          <Chip className="offer-card__amount" kind="num">+3</Chip>
        </div>
        <p className="offer-card__tag">#Тег</p>
      </div>
      <p className="offer-card__deadline">До..</p>
    </div>
  </div>;
};

export default OfferCard;
