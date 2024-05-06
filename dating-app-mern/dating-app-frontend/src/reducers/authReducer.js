import constants from '../constants/actionTypes'

let initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    user: {
        id: localStorage.getItem('userId') || '',
        username: localStorage.getItem('username') || ''
    }
};

const authReducer = (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch (action.type) {
        case constants.USER_LOGGEDIN:
            updated['loggedIn'] = true;
            updated['user'] = {
                id: action.user.id,
                username: action.user.username
            };
            return updated;

        case constants.USER_LOGOUT:
            updated['loggedIn'] = false;
            updated['user'] = {
                id:'', username: ''
            };
            return updated;

        default:
            return state;
    }
}

export default authReducer