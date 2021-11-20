import * as types from './../contants/modal';

const initialState = {
    showmodal: false,
    token: JSON.parse(localStorage.getItem('product')) ? JSON.parse(localStorage.getItem('product')) : [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_MODAL:
            {
                return {
                    ...state,
                    showmodal: true,
                };
            }
        case types.HIDE_MODAL:
            {
                return {
                    ...state,
                    showmodal: false,
                };
            }
        case types.SETTER_TOKEN:
            {
                const { data } = action.payload;
                return {
                    ...state,
                    token: data,
                };
            }

        default:
            return state;
    }
};

export default reducer;