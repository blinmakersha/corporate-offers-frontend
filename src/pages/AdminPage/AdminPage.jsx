import React, { useState } from "react";
import OfferCard from "../../components/OfferCard/OfferCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Accordion from "../../components/Accordion/Accordion.jsx";
import "./AdminPage.css";
import { testOfferCards } from "../../utils/testData";
import ShowMore from "../../components/ShowMore/ShowMore.jsx";

const AdminPage = () => {
  const [offerCards, setOfferCards] = useState(testOfferCards);
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(10);

  return (
    <div className="admin-page">
      <h3 className="admin-page__about-user">
        Вы авторизованы как Администратор
      </h3>
      <div className="admin-page__info-header">
        <h1 className="admin-page__main-title">Управление</h1>
        <div className="admin-page__info-header-tabmenu">
          <a className="admin-page__tabmenu-item">
            Опубликованные
          </a>
          <a className="admin-page__tabmenu-item">
            Архив
          </a>
          <a className="admin-page__tabmenu-item">
            Черновик
          </a>
          <a href="/create-offer-card" className="admin-page__edit">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6.5L12 18.5"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M18 12.5L6 12.5"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Создать новое предложение
          </a>
        </div>
      </div>
      <div className="admin-page__info-buttons">
        <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} />
        <a href="/" className="admin-page__exit">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12.5L3.29289 11.7929L2.58579 12.5L3.29289 13.2071L4 12.5ZM19 13.5C19.5523 13.5 20 13.0523 20 12.5C20 11.9477 19.5523 11.5 19 11.5V13.5ZM9.29289 5.79289L3.29289 11.7929L4.70711 13.2071L10.7071 7.20711L9.29289 5.79289ZM3.29289 13.2071L9.29289 19.2071L10.7071 17.7929L4.70711 11.7929L3.29289 13.2071ZM4 13.5H19V11.5H4V13.5Z"
              fill="black"
            />
          </svg>
          Выйти из панели администратора
        </a>
      </div>
      {openFilter && (
        <div className="admin-page__filters">
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
      <div className="admin-page__wrap-offer-card">
        {offerCards.map((item) => (
          <span key={item.id}>
            <OfferCard isAdmin data={item} />
          </span>
        ))}
      </div>
      <div className="admin-page__wrap-show-more">
        <ShowMore setPage={setPage} />
      </div>
    </div>
  );
};

export default AdminPage;
