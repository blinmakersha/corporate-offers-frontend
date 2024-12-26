import axios from "axios";

async function getOffers(kind ,token) {
  try {
    const response = await axios.get(`/offers/${kind}`, {
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
