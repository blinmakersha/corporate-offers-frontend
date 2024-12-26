import React, { useState, useEffect } from "react";
import OfferCard from "../../components/OfferCard/OfferCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Accordion from "../../components/Accordion/Accordion.jsx";
import "./HomePage.css";
import ShowMore from "../../components/ShowMore/ShowMore.jsx";
import { api } from "../../core/services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserProvider";

const HomePage = () => {
  const [offers, setOffers] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const token = localStorage.getItem("AccessToken");
  const roleUser = JSON.parse(user).user.role;

  useEffect(() => {
    api.ApiOffers.getOffers("active", token)
      .then((response) => {
        setOffers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(offers);
  }, []);

  const handleLogout = () => {
    api.ApiLogin.logoutUser(token)
      .then(() => {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home-page">
      <div className="home-page__header">
        <h3 className="home-page__about-user">
          Вы авторизованы как{" "}
          {roleUser == "Admin" ? "Администратор" : "Сотрудник"}
        </h3>
        <button onClick={handleLogout} className="logout-button">
          Выйти
        </button>
      </div>
      <div className="home-page__info-header">
        <h1 className="home-page__main-title">Корпоративные скидки</h1>
        {roleUser == "Admin" && (
          <a href="/admin" className="home-page__edit">
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
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18 12.5L6 12.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Управление
          </a>
        )}
      </div>
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
        {offers.map((item) => (
          <span key={item.id}>
            <OfferCard data={item} />
          </span>
        ))}
      </div>
      {/* <div className="home-page__wrap-show-more">
        <ShowMore setPage={setPage} />
      </div> */}
    </div>
  );
};

export default HomePage;
