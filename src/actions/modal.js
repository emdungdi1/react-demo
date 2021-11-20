import * as contant from './../contants/modal';

export const showModal = () => ({
    type: contant.SHOW_MODAL,
});

export const hideModal = () => ({
    type: contant.HIDE_MODAL,
});

export const changeModalTitle = (title) => ({
    type: contant.CHANGE_MODAL_TITLE,
    payload: {
        title,
    },
});

export const changeModalContent = (component) => ({
    type: contant.CHANGE_MODAL_CONTENT,
    payload: {
        component,
    },
});

//modal giay
export const showModalGiay = () => ({
    type: contant.SHOW_MODAL_GIAY,
});

export const hideModalGiay = () => ({
    type: contant.HIDE_MODAL_GIAY,
});

export const changeModalTitleGiay = (titleGiay) => ({
    type: contant.CHANGE_MODAL_GIAY_TITLE,
    payload: {
        titleGiay,
    },
});

export const changeModalContentGiay = (componentGiay) => ({
    type: contant.CHANGE_MODAL_GIAY_CONTENT,
    payload: {
        componentGiay,
    },
});

export const getToken = () => ({
    type: contant.GET_TOKEN,
    payload: {},
});

export const setterToken = (data) => ({
    type: contant.SETTER_TOKEN,
    payload: {
        data,
    },
});