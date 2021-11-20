import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
var url_upload = 'api/upload';
var URL = 'https://nhatdoan.herokuapp.com';

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

export const ThemSize = (data) => {
    return authAxios.post(`/api/size/`, data);
};

export const getSize = () => {
    return authAxios.get(`/api/size`);
};

export const updateSize = (data) => {
    return authAxios.patch(`/api/size`, data);
};

export const deleteSize = (data) => {
    return authAxios.post(`/api/size/delete`, data);
};