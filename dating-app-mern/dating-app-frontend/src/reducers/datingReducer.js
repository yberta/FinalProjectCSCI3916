import constants from '../constants/actionTypes'

const initialState = {
    people: [],
    error: null
};

function peopleReducer(state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_PEOPLE:
            return { ...state, people: action.people };
        case constants.FETCH_PEOPLE_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export default peopleReducer;