import * as contant from '../contants/khach_hang';
// import Moment from 'moment';
const initialState = {
    KhachHangEditting: [],
    ListKhacHang: [],
    tam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_KHACHHANG:
            return {
                ...state,
                ListKhacHang: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_KHACHHANG:
            const { data } = action.payload;
            return {
                ...state,
                ListKhacHang: data.data,
                tam: data.data,
            };

        case contant.THEM_KHACHHANG:
            {
                let { id, data } = action.payload;
                var newData = {
                    id: id,
                    messenger_id: data.messenger_id,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    phone: data.phone,
                    avatar: data.avatar,
                    ten_khach_hang: data.ten_khach_hang,
                    ngay_sinh: data.ngay_sinh,
                    gioi_tinh: data.gioi_tinh,
                };
                return {
                    ...state,
                    ListKhacHang: [newData].concat(state.ListKhacHang),
                    tam: [newData].concat(state.ListKhacHang),
                };
            }

        case contant.SET_KHACHHANG_EDITTING:
            {
                const { khachhang } = action.payload;
                return {
                    ...state,
                    KhachHangEditting: khachhang,
                };
            }
        case contant.SET_KHACHHANG_EDITTING_NULL:
            {
                return {
                    ...state,
                    KhachHangEditting: [],
                };
            }
        case contant.UPDATE_KHACHHANG:
            {
                const { data } = action.payload;
                const { ListKhacHang } = state;
                const index = ListKhacHang.findIndex((item) => item.id === data.id);

                if (index !== -1) {
                    const newlist = [...ListKhacHang.slice(0, index), data, ...ListKhacHang.slice(index + 1)];
                    return {
                        ...state,
                        ListKhacHang: newlist,
                        KhachHangEditting: [],
                    };
                }
                return {
                    ...state,
                    tam: ListKhacHang,
                };
            }
        case contant.DELETE_KHACHHANG:
            {
                const { id } = action.payload;
                const { ListKhacHang } = state;
                const index = ListKhacHang.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const newlist = [...ListKhacHang.slice(0, index), ...ListKhacHang.slice(index + 1)];
                    return {
                        ...state,
                        ListKhacHang: newlist,
                    };
                }
                return {
                    ...state,
                };
            }
        default:
            return state;
    }
};

export default reducer;