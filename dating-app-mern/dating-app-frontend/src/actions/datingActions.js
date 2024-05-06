import actionTypes from '../constants/actionTypes';
const env = process.env;
// Action to set people data
function setPeople(data) {
    return {
        type: actionTypes.FETCH_PEOPLE,
        people: data
    };
}
function fetchMatchesSuccess(matches) {
    return {
        type: actionTypes.FETCH_MATCHES_SUCCESS,
        payload: matches
    }
}
function fetchMatchesError(error){
    return {
        type: actionTypes.FETCH_MATCHES_ERROR,
        payload: error
    }
}
function createMatchSuccess(){
    return {
        type: actionTypes.CREATE_MATCHES_SUCCESS
    }
}
function createMatchError(error) {
    return {
        type: actionTypes.CREATE_MATCHES_ERROR,
        payload: error
    }
}
export function createMatch(){
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/matches`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        }).then(data => {
            dispatch(createMatchSuccess(data));
        }).catch(error => {
            console.error('Error fetching people:', error);
            dispatch(createMatchError(error));
        });
    };
}
function fetchPeopleError(error) {
    return {
        type: actionTypes.FETCH_PEOPLE_ERROR,
        error
    };
}

export function fetchMatches (userId){
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/matches/${userId}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        }).then(data => {
            dispatch(fetchMatchesSuccess(data));
        }).catch(error => {
            console.error('Error fetching matches:', error);
            dispatch(fetchMatchesError(error));
        });
    };
}



export function fetchPeople() {
    return dispatch => {

        return fetch(`${env.REACT_APP_API_URL}/datingCards`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            mode: 'cors'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        }).then(data => {
            dispatch(setPeople(data));
        }).catch(error => {
            console.error('Error fetching people:', error);
            dispatch(fetchPeopleError(error));
        });
    };
}