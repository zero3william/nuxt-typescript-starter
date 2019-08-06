import Axios from 'axios';
import Qs from 'qs';

export const wsBaseIp = 'ws://192.168.50.15:8668/goral/ws';
export default function (ctx, inject) {
    const watchDog = Axios.create({
        baseURL: `http://192.168.50.16:8000/watchdog/api/v1/`
    });
    const goral = Axios.create({
        baseURL: `http://192.168.50.15:8989/goral/api/`
    });

    goral.interceptors.request.use(function (config) {
        if (config.url === "/token/logintoken") {
            config.url += `?authorization=${window.sessionStorage.getItem("getWsLoginToken")}`
            return config;
        }
        if (window.sessionStorage.getItem("goralToken")) {
            config.url += `?authorization=${window.sessionStorage.getItem("goralToken")}`
        }
        return config;
    }, function (error) {
        console.error('interceptors request err', error);
    });
    goral.interceptors.response.use(data => {
        if (data.status && data.status == 200) {
            return data.data
        }
        return Promise.reject(data);
    }, err => {
        if (err.response.status == 400) {
            return Promise.reject(err.response.data);
        }
        return Promise.reject(err);
    })

    watchDog.interceptors.request.use(function (config) {
        config.data = Qs.stringify(config.data);
        let auth = window.sessionStorage.getItem("login_session_id");
        if (auth) {
            config.url += `?login_session_id=${auth}`
        }
        return config;
    }, function (error) {
        console.error('interceptors request err', error);
    });
    watchDog.interceptors.response.use(data => {
        if (data.status && data.status == 200) {
            return data.data
        }
        return Promise.reject(data);
    }, err => {
        if (err.response.status == 400) {
            return Promise.reject(err.response.data);
        }
        return Promise.reject(err);
    })

    const thirdApi = {
        getLoginSessionId: (payload) => watchDog.post('/login_front', payload)
    }

    const goralApi = {
        getContacts: () => goral.get(`/user/contacts`),
        getWsLoginToken: () => goral.post('/token/logintoken'),
        uploadImg: (payload) => goral.post('/upload/image', payload)
    }

    inject('goralApi', goralApi);
    inject('thirdApi', thirdApi);
}