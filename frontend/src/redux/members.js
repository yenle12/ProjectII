import * as ActionTypes from './ActionTypes';

export const Members = (state = { loading: true,
    errMess: null,
    members:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MEMBERS:
            return {...state, loading: false, errMess: null, members: action.members};

        case ActionTypes.ADD_NEW_MEMBER:
            var member = action.member;
            return { ...state, members: state.members.concat(member)};

        case ActionTypes.MEMBERS_LOADING:
            return {...state, loading: true, errMess: null, members: []}

        case ActionTypes.MEMBERS_FAILURE:
            return {...state, loading: false, errMess: action.members};

        default:
            return state;
    }
};