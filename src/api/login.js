import axios from 'axios';
import * as constant from './../contants/index';
// import qs from 'query-string';

const url_login_admin = 'api/users/login';
const url_user = 'api/users';

const token = JSON.parse(localStorage.getItem('token'));
var URL = 'https://nhatdoan.herokuapp.com';
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

export const loginAdmin = (data) => {
    return authAxios.post(`${constant.API_ENPOINT}/${url_login_admin}`, data);
};

export const getUser = () => {
    return authAxios.get(`/${url_user}`);
};