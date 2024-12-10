import React from "react";
import OfferCard from "../../components/OfferCard/OfferCard";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="wrap-offer-card">
      <OfferCard />
      <OfferCard />
      <OfferCard />
    </div>
  );
};

export default HomePage;
