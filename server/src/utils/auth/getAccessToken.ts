import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const getAccessToken = async (refreshToken: string): Promise<any> => {
  try {
    if (!refreshToken) {
      throw new Error("No refreshToken");
    }
    const apiKey = process.env.FIREBASE_API_KEY;
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await response.data;

    if (!data.id_token) {
      throw new Error("Invalid Refresh Token");
    }

    return data.id_token;
  } catch (error) {
    console.log(error);
  }
};
