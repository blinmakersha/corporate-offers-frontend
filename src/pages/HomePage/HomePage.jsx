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
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [category, setCategory] = useState({});

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
    api.ApiOffers.getOffers("active", token, {
      city: city.name,
      category: category.name,
    })
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [city, category]);

  const selectCity = (id) => {
    if (city.id == id) {
      setCity("");
    } else {
      setCity((prevCity) => cities.find((city) => city.id === id));
    }
  };

  const selectCategory = (id) => {
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
        <a
          target="_target"
          href={
            roleUser == "Employee"
              ? "https://docs.google.com/document/d/160I2l7gCSkrIgGGV6PVtLO67VZvkTRe45mahBw9Dgls/edit?usp=sharing"
              : "https://docs.google.com/document/d/1vhuHbr2bHrXmMUd72JK1FUZy6CXUia7RG-znR5OJwoc/edit?usp=sharing"
          }
          className="home-page__guide"
        >
          Как воспользоваться скидкой?
        </a>
      </div>
      {openFilter && (
        <div className="home-page__filters">
          <Accordion title="Все города">
            {cities.map((cityItem) => (
              <a
                key={cityItem.id}
                onClick={() => selectCity(cityItem.id)}
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
                onClick={() => selectCategory(categoryItem.id)}
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
      <div className="home-page__wrap-offer-card">
        {offers.map((item) => (
          <a
            className="home-page__item"
            href={`/offer/${item.id}`}
            key={item.id}
          >
            <OfferCard data={item} />
          </a>
        ))}
      </div>
      {/* <div className="home-page__wrap-show-more">
        <ShowMore setPage={setPage} />
      </div> */}
    </div>
  );
};

export default HomePage;
