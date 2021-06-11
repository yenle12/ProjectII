import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = { loading: true,
    errMess: null,
    feedbacks:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACKS:
            return {...state, loading: false, errMess: null, feedbacks: action.feedbacks};

        case ActionTypes.FEEDBACKS_LOADING:
            return {...state, loading: true, errMess: null, feedbacks: []};

        case ActionTypes.FEEDBACKS_FAILURE:
            return {...state, loading: false, errMess: action.errMess};

        default:
            return state;
    }
};