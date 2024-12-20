import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OfferCard from "../../components/OfferCard/OfferCard.jsx";
import { testOfferCards } from "../../utils/testData";
import "./CardPage.css";

const CardPage = () => {
  const { id: offerId } = useParams();
  const [offerCards] = useState(testOfferCards);
  const [isAdmin] = useState(false);

  const offerCard = offerCards.find(card => card.id === offerId);

  if (!offerCard) {
    return <div>Карточка не найдена</div>;
  }

  return (
    <div className="card-page">
      <h3 className="card-page__about-user">
        Вы авторизованы как {isAdmin ? "Администратор" : "Сотрудник"}
      </h3>
      <div className="card-page__info-header">
        <h1 className="card-page__main-title">Корпоративные скидки</h1>
        {isAdmin && (
          <a href="/admin" className="card-page__edit">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {}
            </svg>
            Управление
          </a>
        )}
      </div>
      <div className="card-page__wrap-offer-card">
        <span>
          <OfferCard data={offerCard} largeView={true} />
        </span>
      </div>
    </div>
  );
};

export default CardPage;