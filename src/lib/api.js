import axios from 'axios';

export const API = (function () {
    let axiosInstance;
    let accessToken;
    let isRefreshing = false;

    async function handleRefreshToken(error) {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    'http://localhost:3000/auth/refresh',
                    {},
                    { withCredentials: true }
                );

                const newToken = res.data.access_token;
                localStorage.setItem("access_token", newToken);
                accessToken = newToken;

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }

    function init() {
        axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            withCredentials: true,
        });

        accessToken = localStorage.getItem("access_token");

        axiosInstance.interceptors.request.use((config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        axiosInstance.interceptors.response.use(
            (response) => response,
            handleRefreshToken
        );

        return {
            setAccessToken(token) {
                localStorage.setItem("access_token", token);
                accessToken = token;
            },

            getAccessToken() {
                return accessToken;
            },

            login(creds) {
                return axios.post('http://localhost:3000/auth/login', creds, { withCredentials: true });
            },

        };
    }

    return init();
})();