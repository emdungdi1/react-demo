import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
var url_upload = 'api/upload';
var URL = 'https://nhatdoan.herokuapp.com';
var url_them_khuyen_mai = 'api/khuyen_mai';
// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

export const uploadMultiple = (file) => {
    let formData = new FormData();

    const config = {
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'content-type': 'multipart/form-data',
        },
    };
    for (const key of Object.keys(file)) {
        formData.append('image', file[key]);
    }
    return axios.post(`${URL}/api/multiple`, formData, config);
};

export const upload = (file) => {
    let formData = new FormData();
    const config = {
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'content-type': 'multipart/form-data',
        },
    };
    formData.append('image', file);
    return axios.post(`${URL}/${url_upload}`, formData, config);
};

export const ThemKhuyenMai = (data) => {
    return authAxios.post(`${URL}/${url_them_khuyen_mai}`, data);
};

export const getKhuyenMai = () => {
    return authAxios.get(`/api/khuyen_mai`);
};

export const updateKhuyenMai = (data) => {
    return authAxios.patch(`/api/khuyen_mai`, data);
};

export const deleteKhuyenMai = (data) => {
    return authAxios.post(`/api/khuyen_mai/delete`, data);
};