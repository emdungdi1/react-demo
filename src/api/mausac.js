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

export const upload = (file) => {
    console.log(file);
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

export const ThemMauSac = (data) => {
    return authAxios.post(`/api/mau_sac/`, data);
};

export const getMauSac = () => {
    return authAxios.get(`/api/mau_sac`);
};

export const updateMauSac = (data) => {
    return authAxios.patch(`/api/mau_sac`, data);
};

export const deleteMauSac = (data) => {
    return authAxios.post(`/api/mau_sac/delete`, data);
};