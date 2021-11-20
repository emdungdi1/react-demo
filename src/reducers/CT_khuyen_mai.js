import * as contant from '../contants/ct_khuyen_mai';
// import Moment from 'moment';
const initialState = {
	CTKhuyenMaiEditting: [],
	ListCTKhuyenMai: [],
	tam: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case contant.FETCH_CT_KHUYENMAI:
			return {
				...state,
				ListCTKhuyenMai: [],
				tam: [],
			};
		case contant.FETCH_SUCCESS_CT_KHUYENMAI:
			const { data } = action.payload;
			return {
				...state,
				ListCTKhuyenMai: data.data,
				tam: data.data,
			};

		case contant.THEM_CT_KHUYENMAI: {
			let { data } = action.payload;
			var newData = {
				id_khuyen_mai: data.id_khuyen_mai,
				id_giay: data.id_giay,
				gia_ban_khuyen_mai: data.gia_ban_khuyen_mai,
			};
			return {
				...state,
				ListCTKhuyenMai: [newData].concat(state.ListCTKhuyenMai),
				tam: [newData].concat(state.ListCTKhuyenMai),
			};
		}

		case contant.SET_CT_KHUYENMAI_EDITTING: {
			const { loaigiay } = action.payload;
			const { ListCTKhuyenMai } = state;
			let dat = ListCTKhuyenMai.filter((item) => {
				return item.id_khuyen_mai === loaigiay.id;
			});
			return {
				...state,
				CTKhuyenMaiEditting: dat,
			};
		}
		case contant.SET_CT_KHUYENMAI_EDITTING_NULL: {
			return {
				...state,
				CTKhuyenMaiEditting: [],
			};
		}
		case contant.UPDATE_CT_KHUYENMAI: {
			const { id_khuyen_mai, id_giay } = action.payload;
			const { ListCTKhuyenMai } = state;
			const index = ListCTKhuyenMai.findIndex(
				(item) => item.id_khuyen_mai === id_khuyen_mai && item.id_giay === id_giay
			);

			if (index !== -1) {
				const newlist = [...ListCTKhuyenMai.slice(0, index), data, ...ListCTKhuyenMai.slice(index + 1)];
				return {
					...state,
					ListCTKhuyenMai: newlist,
					khuyenMaiEditting: [],
				};
			}
			return {
				...state,
				tam: ListCTKhuyenMai,
			};
		}
		case contant.DELETE_CT_KHUYENMAI: {
			const { id_khuyen_mai, id_giay } = action.payload;
			const { ListCTKhuyenMai } = state;

			const index = ListCTKhuyenMai.findIndex(
				(item) => item.id_khuyen_mai === id_khuyen_mai && item.id_giay === id_giay
			);
			console.log(index);
			if (index !== -1) {
				const newlist = [...ListCTKhuyenMai.slice(0, index), ...ListCTKhuyenMai.slice(index + 1)];
				return {
					...state,
					ListCTKhuyenMai: newlist,
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
