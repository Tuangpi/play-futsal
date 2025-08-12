import axios from 'axios';
import { getToken, setToken } from './token';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    async error => {
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true; // Prevent infinite loop
            try {
                const res = await api.get('/refresh-token');
                const newToken = res.data.accessToken;
                setToken(newToken);
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return api(error.config);
            } catch {
                // Optional: redirect to login or show modal
            }
        }
        return Promise.reject(error);
    }
);

export default api;
