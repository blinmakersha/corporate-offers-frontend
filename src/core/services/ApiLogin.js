import axios from "axios";

async function loginUser(payload) {
  try {
    const response = await axios.post("/users/login", payload);
    return response.data;
  } catch (error) {
    console.error("Error login user");
    throw error;
  }
}

async function logoutUser(token) {
  try {
    await axios.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.error("Error login user");
    throw error;
  }
}

export const ApiLogin = {
  loginUser,
  logoutUser,
};
