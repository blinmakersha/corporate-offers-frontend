import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OfferCardPage.css";
import Chip from "../../components/Chip/Chip.jsx";
import { api } from "../../core/services/api";
import TextWithLinks from "../../components/TextWithLinks/TextWithLinks.jsx";

const OfferCardPage = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const token = localStorage.getItem("AccessToken");

  useEffect(() => {
    api.ApiOfferCard.getOffer(id, token)
      .then((response) => {
        setOffer(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(offer);
  }, []);

  return (
    <div className="offer-card-page">
      <div className="offer-card-page__info-header">
        <h1 className="offer-card-page__main-title">Корпоративные скидки</h1>
      </div>
      <div className="offer-card-page__content-wrap">
        <div className="offer-card-page__image-container">
          <img
            src={offer.imagePath}
            alt={offer.name ?? ""}
            className="offer-card-page__image"
          />
        </div>
        <div className="offer-card-page__info">
          <div className="offer-card-page__tags">
            <div className="offer-card-page__tags-wrap">
              <div className="offer-card-page__location">
                {offer?.cities && offer.cities.length > 0 ? (
                  <Chip kind="city">
                    <svg
                      fill="#000000"
                      height="14px"
                      width="14px"
                      style={{ marginRight: "5px" }}
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 368.666 368.666"
                      xmlSpace="preserve"
                    >
                      <g id="XMLID_2_">
                        <g>
                          <g>
                            <path
                              d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515
				c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51
				c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355
				c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552
				c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297
				C313.629,178.709,304.004,206.393,285.795,229.355z"
                            />
                            <path
                              d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374
				S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374
				s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    {offer.cities.map((city) => city.name).join(", ")}
                  </Chip>
                ) : (
                  <p>Город не выбран</p>
                )}
              </div>
              <p className="offer-card-page__tag">#{offer?.category?.name}</p>
            </div>
          </div>
          <h2 className="offer-card-page__title">{offer.name ?? <br></br>}</h2>
          <p className="offer-card-page__description">
            <TextWithLinks text={offer.description} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCardPage;
