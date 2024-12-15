import React, { useState } from "react";
import OfferCard from "../../components/OfferCard/OfferCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Accordion from "../../components/Accordion/Accordion.jsx";
import "./HomePage.css";
import { testOfferCards } from "../../utils/testData";
import ShowMore from "../../components/ShowMore/ShowMore.jsx";

const HomePage = () => {
  const [offerCards, setOfferCards] = useState(testOfferCards);
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(10);

  return (
    <div className="home-page">
      <h3 className="home-page__about-user">Вы авторизованы как Сотрудник</h3>
      <h1 className="home-page__main-title">Корпоративные скидки</h1>
      <div className="home-page__info-buttons">
        <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} />
        <a href="" className="home-page__guide">
          Как воспользоваться скидкой?
        </a>
      </div>
      {openFilter && (
        <div className="home-page__filters">
          <Accordion
            title="Все города"
            content="<a>Город 1</a><a>Город 2</a><a>Город 3</a>"
          />
          <Accordion
            title="Все категории"
            content="<a>Категория 1</a><a>Категория 2</a><a>Категория 3</a>"
          />
        </div>
      )}
      <div className="home-page__wrap-offer-card">
        {offerCards.map((item) => (
          <span key={item.id}>
            <OfferCard data={item} />
          </span>
        ))}
      </div>
      <div className="home-page__wrap-show-more">
        <ShowMore setPage={setPage}/>
      </div>
    </div>
  );
};

export default HomePage;
