import * as ActionTypes from './ActionTypes';

const initialState = {
        loading: false,
        loggedIn: localStorage.getItem('token') ? true : false,
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
        errMess: null
    }

export const Authentication = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                loading: true,
                loggedIn: false,
                user: action.user,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                loading: false,
                loggedIn: true,
                errMess: '',
                token: action.token
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                loading: false,
                loggedIn: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                loading: true,
                loggedIn: true,
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,
                loading: false,
                loggedIn: false,
                user: null,
                token: null,
            };
        default:
            return state
    }
}