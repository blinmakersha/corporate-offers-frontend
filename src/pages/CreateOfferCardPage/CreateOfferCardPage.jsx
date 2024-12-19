import React, { useState } from "react";
import OfferCard from "../../components/OfferCard/OfferCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Accordion from "../../components/Accordion/Accordion.jsx";
import "./CreateOfferCard.css";
import { testOfferCards } from "../../utils/testData.js";
import ShowMore from "../../components/ShowMore/ShowMore.jsx";

const CreateOfferCard = () => {
  const [offerCards, setOfferCards] = useState(testOfferCards);
  const [openFilter, setOpenFilter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [page, setPage] = useState(10);

  return <div className="create-offer-card"></div>;
};

export default CreateOfferCard;
