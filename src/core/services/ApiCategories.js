import axios from "axios";

async function getCategories(token) {
  try {
    const response = await axios.get("/categories", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    return 400;
  }
}

export const ApiCategories = {
  getCategories,
};
