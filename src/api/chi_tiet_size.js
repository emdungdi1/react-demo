import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
var url_upload = 'api/upload';
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

export const getSize = (data) => {
    return authAxios.post(`/api/chi_tiet_size/getSize`, data);
};

export const update = (data) => {
    return authAxios.post(`/api/chi_tiet_size/update`, data);
};