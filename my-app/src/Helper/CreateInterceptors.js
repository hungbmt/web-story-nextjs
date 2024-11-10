import { refreshToken } from "@/lib/apiRequest/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Remove the curly braces
import { useMemo } from "react";

export const CreateAxios = (user, dispatch, stateSuccess) => {
  const localhostApi = "http://localhost:3000";

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: localhostApi,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    instance.interceptors.request.use(
      async (config) => {
        let date = new Date();
        if (!user || !user.AccessToken) {
          console.error("User or AccessToken is not defined");
          return config;
        }

        const decodedToken = jwtDecode(user.AccessToken);
        const isExpired = decodedToken.exp < Math.floor(date.getTime() / 1000);

        if (isExpired) {
          console.log("Token is expired");
          const data = await refreshToken();
          const refreshUser = {
            ...user,
            AccessToken: data.AccessToken,
          };
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

    return instance;
  }, [user, dispatch, stateSuccess]);

  return axiosInstance;
};
