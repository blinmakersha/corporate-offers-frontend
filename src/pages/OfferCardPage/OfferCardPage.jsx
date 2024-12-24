import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chip from "../../components/Chip/Chip.jsx";
import "./OfferCardPage.css";

const OfferCardPage = () => {
  const { id: id } = useParams();
  const [offerCard, setOfferCard] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferCard = async () => {
      try {
        const response = await fetch(`/api/offers/${id}`);
        if (!response.ok) {
          throw new Error('Карточка предложения не найдена');
        }
        const data = await response.json();
        setOfferCard(data);
      } catch (error) {
        console.error('Ошибка получения карточки предложения:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferCard();
  }, [offerId]);

  if (loading) {
    return <div className="offer-card-page__loading">Загрузка...</div>;
  }

  if (notFound) {
    return <div className="offer-card-page__not-found">Предложение не найдено</div>;
  }

  return (
    <div className="offer-card-page">
      <div className="offer-card-page__info-header">
        <h1 className="offer-card-page__main-title">Корпоративные скидки</h1>
      </div>
      <div className="offer-card-page__content-wrap">
        <div className="offer-card-page__image-container">
          <img src={offerCard.image} alt={offerCard.title} className="offer-card-page__image" />
        </div>
        <div className="offer-card-page__info">
          <div className="offer-card-page__tags">
            <div className="offer-card-page__tags-wrap">
              <div className="offer-card-page__location">
                <Chip kind="city">
                  <svg
                    fill="#000000"
                    height="14px"
                    width="14px"
                    style={{ marginRight: "5px" }}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 368.666 368.666"
                  >
                  </svg>
                  {offerCard.city}
                </Chip>
                <Chip className="offer-card-page__amount" kind="num">
                  {offerCard.amount}
                </Chip>
              </div>
              <p className="offer-card-page__tag">#{offerCard.tag}</p>
            </div>
          </div>
          <h2 className="offer-card-page__title">{offerCard.title}</h2>
          <p className="offer-card-page__description">{offerCard.description}</p>
        </div>
      </div>
    </div>
  );
};

export default OfferCardPage;


// C тестовыми данными (можно проверить стили и тд)

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import Chip from "../../components/Chip/Chip.jsx";
// import "./OfferCardPage.css";

// const OfferCardPage = () => {
//   const { id: offerId } = useParams();
//   const [isAdmin] = useState(false);

//   const offerCard = {
//     id: "1",
//     title: "Кофейня",
//     description: "Повседневная практика показывает, что высококачественный прототип будущего проекта представляет собой интересный эксперимент проверки системы массового участия. Банальные, но неопровержимые выводы, а также элементы политического процесса и по сей день остаются уделом либералов, которые жаждут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Картельные сговоры не допускают ситуации, при которой интерактивные прототипы набирают популярность среди определенных слоев населения, а значит, должны быть объявлены нарушающими общечеловеческие нормы этики и морали. Значимость этих проблем настолько очевидна, что граница обучения кадров обеспечивает актуальность новых предложений. А также многие известные личности представлены в исключительно положительном свете. Предварительные выводы неутешительны: современная методология разработки предоставляет широкие возможности для поставленных обществом задач. Противоположная точка зрения подразумевает, что активно развивающиеся страны третьего мира будут рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.",
//     city: "Москва",
//     amount: 20,
//     tag: "Кафе и рестораны",
//     image: "https://img.freepik.com/free-photo/friends-enjoying-coffee-together_23-2149304451.jpg?t=st=1734960412~exp=1734964012~hmac=afa90a37f227e0fa1fbf312f6a8f1e0f2e3f187f8bd8a91a2e888dfc5c641229&w=2000",
//   };


//   return (
//     <div className="offer-card-page">
//       <h3 className="home-page__about-user">
//         Вы авторизованы как {isAdmin ? "Администратор" : "Сотрудник"}
//       </h3>
//       <div className="offer-card-page__info-header">
//         <h1 className="offer-card-page__main-title">Корпоративные скидки</h1>
//       </div>
//       <div className="offer-card-page__content-wrap">
//         <div className="offer-card-page__image-container">
//           <img
//             src={offerCard.image}
//             alt={offerCard.title}
//             className="offer-card-page__image"
//           />
//         </div>
//         <div className="offer-card-page__info">
//           <div className="offer-card-page__tags">
//             <div className="offer-card-page__tags-wrap">
//               <div className="offer-card-page__location">
//                 <Chip kind="city">
//                   <svg
//                     fill="#000000"
//                     height="14px"
//                     width="14px"
//                     style={{ marginRight: "5px" }}
//                     version="1.1"
//                     id="Layer_1"
//                     xmlns="http://www.w3.org/2000/svg"
//                     xmlnsXlink="http://www.w3.org/1999/xlink"
//                     viewBox="0 0 368.666 368.666"
//                     xmlSpace="preserve"
//                   >
//                     <g id="XMLID_2_">
//                       <g>
//                         <g>
//                           <path
//                             d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515
//                             c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51
//                             c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355
//                             c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552
//                             c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297
//                             C313.629,178.709,304.004,206.393,285.795,229.355z"
//                           />
//                           <path
//                             d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374
//                             S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374
//                             s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z"
//                           />
//                         </g>
//                       </g>
//                     </g>
//                   </svg>
//                   {offerCard.city}
//                 </Chip>
//                 <Chip className="offer-card-page__amount" kind="num">
//                   {offerCard.amount}
//                 </Chip>
//               </div>
//               <p className="offer-card-page__tag">#{offerCard.tag}</p>
//             </div>
//           </div>
//           <h2 className="offer-card-page__title">{offerCard.title}</h2>
//           <p className="offer-card-page__description">{offerCard.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferCardPage;