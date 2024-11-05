import { refreshToken } from "@/lib/apiRequest/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createAxios = (user, dispatch, stateSuccess)    => {
  const localhostApi = "http://localhost:3000";
    let newInstance;
    newInstance = axios.create({
        "baseURL": localhostApi,
        "headers": {"Content-Type": "application/json"},
        "withCredentials": true,
    });

  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      if (!user || !user.AccessToken) {
        console.error("User or AccessToken is not defined");
        return config; // or handle it appropriately
      }

      const decodedToken = jwtDecode(user.AccessToken);
      const isExpired = decodedToken.exp < Math.floor(date.getTime() / 1000);

      if (isExpired) {
        console.log("Token is expired");
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          "AccessToken": data.AccessToken,
        };
        console.log(refreshUser);
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.AccessToken;
      }
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );

  return newInstance;
};
