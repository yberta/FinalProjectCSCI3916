import actionTypes from '../constants/actionTypes';

const initialState = {
    matches: [],
    loading: false,
    error: null,
    creatingMatch: false
};

const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MATCHES:
            return{
                ...state,
                matches: [...state.matches, action.payload],
                creatingMatch: false
            };
        case actionTypes.CREATE_MATCHES_ERROR:
            return{
                ...state,
                error:action.payload,
                creatingMatch: false
            };
        case actionTypes.FETCH_MATCHES:
            return {
                ...state,
                matches: action.payload,
                loading: false
            };
        case actionTypes.FETCH_MATCHES_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default matchReducer;
