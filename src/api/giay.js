import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
var url_upload = 'api/upload';
var URL = 'https://nhatdoan.herokuapp.com';
var url_them_giay = 'api/giay';
var ulr_chitietmausac_giay = 'api/chi_tiet_mau_sac';
var ulr_chitietsize_giay = 'api/chi_tiet_size';

const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

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
    return authAxios.post(`${URL}/${url_them_giay}`, data);
};
export const pageGiay = (data) => {
    return authAxios.post(`${URL}/${url_them_giay}/page`, data);
};

export const pageSearchGiay = (data) => {
    return authAxios.post(`${URL}/${url_them_giay}/pageSearch`, data);
};

export const getGiay = () => {
    return authAxios.get(`/api/giay`);
};

export const updateGiay = (data) => {
    return authAxios.patch(`/api/giay`, data);
};

export const updateChiTietMSGiay = (data) => {
    return authAxios.patch(`/api/chi_tiet_mau_sac`, data);
};

export const updateChiTietSizeGiay = (data) => {
    return authAxios.patch(`/api/chi_tiet_size`, data);
};

export const deleteGiay = (data) => {
    return authAxios.post(`/api/giay/delete`, data);
};

export const deleteSize = (data) => {
    return authAxios.post(`/api/chi_tiet_size/delete`, data);
};

export const deleteMauSac = (data) => {
    return authAxios.post(`/api/chi_tiet_mau_sac/delete`, data);
};

export const ThemChiTietMauSac = (data) => {
    return authAxios.post(`${URL}/${ulr_chitietmausac_giay}`, data);
};

export const getChiTietMauSac = () => {
    return authAxios.get(`/api/chi_tiet_mau_sac`);
};

export const ThemChiTietSize = (data) => {
    return authAxios.post(`${URL}/${ulr_chitietsize_giay}`, data);
};

export const getChiTietSize = () => {
    return authAxios.get(`/api/chi_tiet_size`);
};

export const getNewProduct = () => {
    return authAxios.get(`/api/giay/newProduct`);
};

export const getNewProducts = () => {
    return authAxios.get(`/api/giay/newProducts`);
};

export const postSanPhamMoi = (data) => {
    return authAxios.post(`/api/giay/sanPhamMoi`, data);
};

export const xemSanPham = (data) => {
    return authAxios.post(`/api/giay/xemSanPham`, data);
};

export const xemSanPhamAll = (data) => {
    return authAxios.post(`/api/giay/xemSanPhamAll`, data);
};

export const postSanPhamMoiPage = (data) => {
    return authAxios.post(`/api/giay/sanPhamMoiPage`, data);
};

export const productsAllByLG = (data) => {
    return authAxios.post(`/api/giay/newProductsAll`, data);
};

export const getProductsPageByLG = (data) => {
    return authAxios.post(`/api/giay/newProductsAllPage`, data);
};

export const getProductLG = () => {
    return authAxios.get(`/api/giay/productLG`);
};

export const postGiayLG = (data) => {
    return authAxios.post(`/api/giay/giayLG`, data);
};