import * as contant from './../contants/loading';

export const showLoadding = () => ({
    type: contant.SHOW_LD,
});

export const hideLoading = () => ({
    type: contant.HIDE_LD,
});