import * as ActionTypes from './ActionTypes';

export const Drinks = (state = { loading: true,
    errMess: null,
    drinks:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DRINKS:
            return {...state, loading: false, errMess: null, drinks: action.drinks};

        case ActionTypes.ADD_NEW_DRINK:
            return { ...state, drinks: state.drinks.concat(action.drink)};

        case ActionTypes.DRINKS_LOADING:
            return {...state, loading: true, errMess: null, drinks: []}

        case ActionTypes.DRINKS_FAILURE:
            return {...state, loading: false, errMess: action.errMess};

        default:
            return state;
    }
};