let _accessToken = "";

export const setToken = (token: string) => {
    _accessToken = token;
};

export const getToken = () => _accessToken;
