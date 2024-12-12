import React from "react"
import './OfferCard.css'
import Chip from '../Chip/Chip'

const OfferCard = (props) => {
  const { data } = props;

  return <div className="offer-card">
    <div className="offer-card__image">
      <img src={data.image} alt="img" />
      <Chip className="offer-card__sale" kind={data?.sale ? "sale" : "profit"}>{data?.sale ? data.sale : 'ВЫГОДА'}</Chip>
    </div>
    <div className="offer-card__info">
      <h2 className="offer-card__title">{data.title}</h2>
      <p className="offer-card__description">{data.description}</p>
    </div>
    <div className="offer-card__tags">
      <div className="offer-card__tags_wrap">
        <div className="offer-card__tags_location">
          <Chip kind="city">{data.city}</Chip>
          <Chip className="offer-card__amount" kind="num">{data.ammount}</Chip>
        </div>
        <p className="offer-card__tag">#{data.tag}</p>
      </div>
      <p className="offer-card__deadline">До {data.date}</p>
    </div>
  </div>
};

export default OfferCard;
