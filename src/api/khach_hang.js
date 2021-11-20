import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));

var URL = 'https://nhatdoan.herokuapp.com';

// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

export const Them = (data) => {
    return authAxios.post(`/api/khach_hang`, data);
};

export const getEmail = (data) => {
    return authAxios.post(`/api/khach_hang/getEmail`, data);
};

export const getFBID = (data) => {
    return authAxios.post(`/api/khach_hang/getFBID`, data);
};

export const loginFB = (data) => {
    return authAxios.post(`/api/khach_hang/loginFB`, data);
};

export const loginEmail = (data) => {
    return authAxios.post(`/api/khach_hang/loginEmail`, data);
};

export const getList = () => {
    return authAxios.get(`/api/khach_hang`);
};

export const update = (data) => {
    return authAxios.patch(`/api/khach_hang`, data);
};

export const deletekhach_hang = (data) => {
    return authAxios.post(`/api/khach_hang/delete`, data);
};