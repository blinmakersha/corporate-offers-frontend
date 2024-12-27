import React, { useEffect, useState } from "react";
import "./EditOfferCardPage.css";
import Input from "../../components/Input/Input.jsx";
import Textarea from "../../components/Textarea/Textarea.jsx";
import Select from "../../components/Select/Select.jsx";
import RadioGroup from "../../components/RadioGroup/RadioGroup.jsx";
import RadioButton from "../../components/RadioButton/RadioButton.jsx";
import { api } from "../../core/services/api.js";
import { useNavigate, useParams } from "react-router-dom";

const EditOfferCardPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: "",
    annotation: "",
    companyUrl: "",
    description: "",
    startDate: "",
    endDate: "",
    imagePath: "",
    discountSize: "",
  });
  const {
    name,
    annotation,
    companyUrl,
    description,
    startDate,
    endDate,
    imagePath,
    discountSize,
  } = inputValue;
  const [selectedOptionType, setSelectedOptionType] = useState("");

  useEffect(() => {
    api.ApiOfferCard.getOffer(id, token)
      .then((response) => {
        setInputValue({
          name: response.data.name,
          annotation: response.data.annotation,
          companyUrl: response.data.companyUrl,
          description: response.data.description,
          startDate: formatDate(response.data.startDate),
          endDate: formatDate(response.data.endDate),
          discountSize: response.data.discountSize,
          imagePath: response.data.imagePath,
        });
        setSelectedOptionType(response.data.offerType);
        setSelectedCities(response.data.cities.map((city) => city.name));
        setSelectedCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleChangeSelect = (e) => {
    setSelectedOptionType(e.target.id);
  };
  console.log(endDate);
  const handleEditOfferCard = (e, status) => {
    api.ApiOfferCard.editOfferCard(
      id,
      {
        ...inputValue,
        offerType: selectedOptionType,
        category: selectedCategory.name,
        cities: selectedCities,
        links: [""],
        status,
        discountSize: selectedOptionType === "Discount" ? discountSize : null,
      },
      token
    )
      .then((result) => {
        navigate("/admin");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="create-offer-card-page">
      <div className="create-offer-card-page__info-header">
        <h1 className="create-offer-card-page__main-title">Управление</h1>
      </div>
      <div className="create-offer-card-page__info-buttons">
        <a href="/" className="create-offer-card-page__exit">
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
      <div className="create-offer-card-page__wrap">
        <div className="create-offer-card-page__photo">
          <div className="create-offer-card-page__photo-img">
            {imagePath && <img src={imagePath} alt="img" />}
          </div>
          <Input
            type="text"
            value={imagePath}
            placeholder="Вставьте ссылку"
            label="Ссылка на фото*"
            name="imagePath"
            dark
            onChange={handleChange}
          />
        </div>
        <div className="create-offer-card-page__items">
          <div className="create-offer-card-page__item">
            <h3 className="create-offer-card-page__item-title">
              ГЛАВНЫЕ АТРИБУТЫ КАРТОЧКИ
            </h3>
            <Input
              type="text"
              value={name}
              placeholder="Введите название"
              label="Название*"
              name="name"
              onChange={handleChange}
            />
            <Input
              type="text"
              value={annotation}
              placeholder="Краткое описание предложения"
              label="Аннотация для карточки*"
              name="annotation"
              onChange={handleChange}
            />
            <Input
              type="text"
              value={companyUrl}
              placeholder="Введите ссылку"
              label="Сайт компании*"
              name="companyUrl"
              onChange={handleChange}
            />
            <Textarea
              type="text"
              value={description}
              placeholder="Введите описание"
              label="Описание предложения*"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="create-offer-card-page__item">
            <h3 className="create-offer-card-page__item-title">
              МЕСТОПОЛОЖЕНИЕ И КАТЕГОРИИ
            </h3>
            <Select
              selected={selectedCities}
              setSelected={setSelectedCities}
              label="Город*"
              style={{ zIndex: 10000 }}
              multi
              data={cities}
            />
            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              label="Категория*"
              data={categories}
            />
          </div>
          <div className="create-offer-card-page__item">
            <h3 className="create-offer-card-page__item-title">
              ТИП ПРЕДЛОЖЕНИЯ
            </h3>
            <RadioGroup>
              <RadioButton
                id="Discount"
                name="Discount"
                value="Discount"
                checked={selectedOptionType === "Discount"}
                onChange={handleChangeSelect}
              >
                Скидка &nbsp;
                {selectedOptionType === "Discount" && (
                  <Input
                    type="text"
                    value={discountSize}
                    placeholder="Размер скидки %"
                    name="discountSize"
                    onChange={handleChange}
                  />
                )}
              </RadioButton>
              <RadioButton
                id="Benefit"
                name="Benefit"
                value="Benefit"
                labelText="Выгода"
                checked={selectedOptionType === "Benefit"}
                onChange={handleChangeSelect}
              />
            </RadioGroup>
          </div>
          <div className="create-offer-card-page__item">
            <h3 className="create-offer-card-page__item-title">
              СРОК ДЕЙСТВИЯ
            </h3>
            <div className="create-offer-card-page__item__duration">
              <Input
                type="date"
                value={startDate}
                placeholder="DD-MM-YYYY"
                label="Начало*"
                name="startDate"
                onChange={handleChange}
              />
              <Input
                type="date"
                value={endDate}
                placeholder="DD-MM-YYYY"
                label="Окончание"
                name="endDate"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="create-offer-card-page__edit-buttons">
            <a
              onClick={(e) => handleEditOfferCard(e, "Draft")}
              className="create-offer-card-page__draft-button"
            >
              Сохранить черновик
            </a>
            <a
              onClick={(e) => handleEditOfferCard(e, "Active")}
              className="create-offer-card-page__publish-button"
            >
              Опубликовать
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOfferCardPage;
