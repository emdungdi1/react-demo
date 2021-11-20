import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
var url_upload = 'api/upload';
var URL = 'https://nhatdoan.herokuapp.com';
var url_them_loai_giay = 'api/loai_giay';
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

export const ThemLoaiGiay = (data) => {
    return authAxios.post(`${URL}/${url_them_loai_giay}`, data);
};

export const getLoaiGiay = () => {
    return authAxios.get(`/api/loai_giay`);
};

export const updateLoaiGiay = (data) => {
    return authAxios.patch(`/api/loai_giay`, data);
};

export const deleteLoaiGiay = (data) => {
    return authAxios.post(`/api/loai_giay/delete`, data);
};