import axios from "axios";

async function getOffers(kind, token, params = { city: "", category: "" }) {
  try {
    let queryString = "";

    if (params.city) queryString += `&city=${params.city}`;
    if (params.category) queryString += `&category=${params.category}`;
    if (queryString.startsWith("&")) queryString = queryString.slice(1);

    const response = await axios.get(`/offers/${kind}?${queryString}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    return 400;
  }
}

export const ApiOffers = {
  getOffers,
};
