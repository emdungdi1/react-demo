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
    return authAxios.post(`/api/chi_tiet_don_hang`, data);
};

export const getList = () => {
    return authAxios.get(`/api/chi_tiet_don_hang`);
};

export const update = (data) => {
    return authAxios.patch(`/api/chi_tiet_don_hang`, data);
};

export const deleteDH = (data) => {
    return authAxios.post(`/api/chi_tiet_don_hang/delete`, data);
};