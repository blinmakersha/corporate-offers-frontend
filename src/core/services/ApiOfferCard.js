import axios from "axios";

async function getOffer(id, token) {
  try {
    const response = await axios.get(`/offers/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    return 400;
  }
}

async function createOfferCard(payload, token) {
  try {
    const response = await axios.post("/offers", payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error create OfferCard");
    throw error;
  }
}

async function archiveOfferCard(id, token) {
  try {
    const response = await axios.put(`/offers/archive/${id}`, {}, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error create OfferCard");
    throw error;
  }
}

async function editOfferCard(id, payload, token) {
  try {
    const response = await axios.put(`/offers/${id}`, payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error edit OfferCard");
    throw error;
  }
}

export const ApiOfferCard = {
  getOffer,
  createOfferCard,
  editOfferCard,
  archiveOfferCard
};
