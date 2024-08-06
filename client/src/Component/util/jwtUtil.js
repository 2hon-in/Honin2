import axios from 'axios';
import { setCookie, getCookie } from './cookieUtil';

const jaxios = axios.create();

const beforeReq = async (config) => {
    const loginUserStr = getCookie('user');
    if (loginUserStr) {
        const loginUser = JSON.parse(loginUserStr);
        const { accessToken } = loginUser;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
};

const requestFail = (err) => Promise.reject(err);

const beforeRes = async (response) => {
    if (response.data && response.data.error === 'ERROR_ACCESS_TOKEN') {
        const loginUserStr = getCookie('user');
        if (loginUserStr) {
            const loginUser = JSON.parse(loginUserStr);
            const headers = { Authorization: `Bearer ${loginUser.accessToken}` };
            try {
                const res = await axios.get(`/api/member/refresh/${loginUser.refreshToken}`, { headers });
                loginUser.accessToken = res.data.accessToken;
                loginUser.refreshToken = res.data.refreshToken;
                setCookie('user', JSON.stringify(loginUser), 1);

                // 요청을 재시도
                response.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return jaxios(response.config);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
    }
    return response;
};

const responseFail = (err) => Promise.reject(err);

jaxios.interceptors.request.use(beforeReq, requestFail);
jaxios.interceptors.response.use(beforeRes, responseFail);

export default jaxios;
