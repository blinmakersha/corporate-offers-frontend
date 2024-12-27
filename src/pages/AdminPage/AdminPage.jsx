import React, { useState, useEffect } from "react";
import OfferCard from "../../components/OfferCard/OfferCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Accordion from "../../components/Accordion/Accordion.jsx";
import "./AdminPage.css";
import ShowMore from "../../components/ShowMore/ShowMore.jsx";
import { api } from "../../core/services/api";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [offers, setOffers] = useState([]);
  const [updateContent, setUpdateContent] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [kind, setKind] = useState("active");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("AccessToken");

  useEffect(() => {
    api.ApiCities.getCities(token)
      .then((response) => {
        setCities(response.data.cities);
      })
      .catch((error) => {
        console.error(error);
      });
    api.ApiCategories.getCategories(token)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    api.ApiOffers.getOffers(kind, token, {
      city: city.name,
      category: category.name,
    })
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [kind, updateContent, city, category]);

  const onClickSelectCity = (id) => {
    if (city.id == id) {
      setCity("");
    } else {
      setCity((prevCity) => cities.find((city) => city.id === id));
    }
  };

  const onClickSelectCategory = (id) => {
    if (category.id == id) {
      setCategory("");
    } else {
      setCategory((prevCategory) =>
        categories.find((category) => category.id === id)
      );
    }
  };

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

  const selectCity = (id) => {
    setCity(cities.filter((city) => city.id === id));
  };
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h3 className="admin-page__about-user">
          Вы авторизованы как Администратор
        </h3>
        <button onClick={handleLogout} className="logout-button">
          Выйти
        </button>
      </div>
      <div className="admin-page__info-header">
        <h1 className="admin-page__main-title">Управление</h1>
        <div className="admin-page__info-header-tabmenu">
          <a
            className={`admin-page__tabmenu-item ${
              kind == "active" ? "active" : ""
            }`}
            onClick={() => setKind("active")}
          >
            Опубликованные
          </a>
          <a
            className={`admin-page__tabmenu-item ${
              kind == "archived" ? "active" : ""
            }`}
            onClick={() => setKind("archived")}
          >
            Архив
          </a>
          <a
            className={`admin-page__tabmenu-item ${
              kind == "draft" ? "active" : ""
            }`}
            onClick={() => setKind("draft")}
          >
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
          <Accordion title="Все города">
            {cities.map((cityItem) => (
              <a
                key={cityItem.id}
                onClick={() => onClickSelectCity(cityItem.id)}
                className={`city-link ${
                  cityItem.id == city.id ? "active" : ""
                }`}
              >
                {cityItem.name}
              </a>
            ))}
          </Accordion>
          <Accordion title="Все категории">
            {categories.map((categoryItem) => (
              <a
                key={categoryItem.id}
                onClick={() => onClickSelectCategory(categoryItem.id)}
                className={`category-link ${
                  categoryItem.id == category.id ? "active" : ""
                }`}
              >
                {categoryItem.name}
              </a>
            ))}
          </Accordion>
        </div>
      )}
      <div className="admin-page__wrap-offer-card">
        {offers.map((item) => (
          <a
            className="admin-page__item"
            href={`/offer/${item.id}`}
            key={item.id}
          >
            <OfferCard
              setUpdateContent={setUpdateContent}
              isAdmin
              data={item}
            />
          </a>
        ))}
      </div>
      {/* <div className="admin-page__wrap-show-more">
        <ShowMore setPage={setPage} />
      </div> */}
    </div>
  );
};

export default AdminPage;
