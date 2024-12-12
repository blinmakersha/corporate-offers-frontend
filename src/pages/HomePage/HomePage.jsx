import React, { useState } from "react";
import OfferCard from "../../components/OfferCard/OfferCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import "./HomePage.css";
import { testOfferCards } from "../../utils/testData";

const HomePage = () => {
  const [offerCards, setOfferCards] = useState(testOfferCards);

  return (
    <div className="home-page">
      <h3 className="home-page__about-user">Вы авторизованы как Сотрудник</h3>
      <h1 className="home-page__main-title">Корпоративные скидки</h1>
      <div className="home-page__info-buttons">
        <Filters/>
        <a href="" className="home-page__guide">
          Как воспользоваться скидкой?
        </a>
      </div>
      <div className="home-page__wrap-offer-card">
        {offerCards.map((item) => (
          <span key={item.id}>
            <OfferCard data={item} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
