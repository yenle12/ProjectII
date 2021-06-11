import * as ActionTypes from './ActionTypes';

export const Users = (state = { loading: true,
    errMess: null,
    users:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return {...state, loading: false, errMess: null, users: action.users}

        case ActionTypes.USERS_LOADING:
            return {...state, loading: true, errMess: null, users: []};

        case ActionTypes.USERS_FAILURE:
            return {...state, loading: false, errMess: action.errMess};

        default:
            return state;
    }
};