import React from "react";
import "./OfferCard.css";
import Chip from "../Chip/Chip";
import { api } from "../../core/services/api";

const OfferCard = (props) => {
  const { data, setUpdateContent, isAdmin } = props;
  const token = localStorage.getItem("AccessToken");

  const handleMoveToArchive = () => {
    api.ApiOfferCard.archiveOfferCard(data.id, token)
      .then((response) => {
        setUpdateContent(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="offer-card">
      <div className="offer-card__image">
        <img src={data?.imagePath} alt="img" />
        <Chip
          className="offer-card__sale"
          kind={data?.discountSize ? "sale" : "profit"}
        >
          {data?.discountSize ? `-${data?.discountSize}%` : "ВЫГОДА"}
        </Chip>
        {isAdmin && (
          <a href={`/edit-offer-card/${data.id}`} className="offer-card__edit">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" fill="" />
              <path
                d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
        {isAdmin && (
          <a
            href="/admin"
            className="offer-card__archive"
            onClick={handleMoveToArchive}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 9.75H19.5V18.3107L18.3107 19.5H5.68934L4.5 18.3107L4.5 9.75H3V4.5H21V9.75ZM6 9.75L18 9.75V17.6893L17.6893 18H6.31066L6 17.6893L6 9.75ZM19.5 6V8.25L4.5 8.25L4.5 6L19.5 6ZM9.75 13.5H15V12H9.75V13.5Z"
                fill="#080341"
              />
            </svg>
          </a>
        )}
      </div>
      <div className="offer-card__info">
        <h2 className="offer-card__title">{data.name ?? <br></br>}</h2>
        <p className="offer-card__description">
          {data.annotation ?? <br></br>}
        </p>
      </div>
      <div className="offer-card__tags">
        <div className="offer-card__tags_wrap">
          <div className="offer-card__tags_location">
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
              {data?.cities[0].name}
            </Chip>
            {data?.cities?.length - 1 > 0 && (
              <Chip className="offer-card__amount" kind="num">
                +{data?.cities?.length - 1}
              </Chip>
            )}
          </div>
          <p className="offer-card__tag">#{data?.category?.name}</p>
        </div>
        <p className="offer-card__deadline">
          До{" "}
          {new Date(data?.endDate).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
