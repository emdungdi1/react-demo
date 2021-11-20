import { combineReducers } from 'redux';
import login from './login';
import loadings from './loading';
import modal from './modal';
import loaigiay from './loai_giay';
import giay from './giay';
import mausac from './mausac';
import size from './size';
import khuyenmai from './khuyen_mai';
import ctkhuyenmai from './CT_khuyen_mai';
import khachhang from './khach_hang';
import ctDonHang from './ct_don_hang';
import dathang from './dat_hang';

const appReducers = combineReducers({
    login: login,
    loadings: loadings,
    modal: modal,
    loaigiay: loaigiay,
    giay: giay,
    mausac: mausac,
    size: size,
    khuyenmai: khuyenmai,
    ctkhuyenmai,
    khachhang,
    dathang,
    ctDonHang,
});

export default appReducers;