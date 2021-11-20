import * as types from './../contants/loading';

const initialState = {
    showLD: false,
};

const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LD:
            {
                return {
                    ...state,
                    showLD: true,
                };
            }
        case types.HIDE_LD:
            {
                return {
                    ...state,
                    showLD: false,
                };
            }
        default:
            return state;
    }
};

export default Reducers;