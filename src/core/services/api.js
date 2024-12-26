import axios from "axios";
import { VITE_API_URL } from "../../utils/variables";
import { ApiLogin } from "./ApiLogin";
import { ApiCities } from "./ApiCities";
import { ApiCategories } from "./ApiCategories";
import { ApiOfferCard } from "./ApiOfferCard";
import { ApiOffers } from "./ApiOffers";

axios.defaults.baseURL = VITE_API_URL;
axios.defaults.headers.post = { "Content-Type": "application/json" };

export const api = {
  ApiLogin,
  ApiCities,
  ApiCategories,
  ApiOfferCard,
  ApiOffers,
};
