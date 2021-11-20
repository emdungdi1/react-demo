import axios from 'axios';

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

export const ThemCTKhuyenMai = (data) => {
    return authAxios.post(`/api/chi_tiet_khuyen_mai`, data);
};

export const getCTKhuyenMai = () => {
    return authAxios.get(`/api/chi_tiet_khuyen_mai`);
};

export const updateCTKhuyenMai = (data) => {
    return authAxios.patch(`/api/chi_tiet_khuyen_mai`, data);
};

export const deleteCTKhuyenMai = (data) => {
    return authAxios.post(`/api/chi_tiet_khuyen_mai/delete`, data);
};