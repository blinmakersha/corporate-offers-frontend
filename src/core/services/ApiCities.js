import axios from "axios";

async function getCities(token) {
  try {
    const response = await axios.get("/cities", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}

export const ApiCities = {
  getCities,
};
