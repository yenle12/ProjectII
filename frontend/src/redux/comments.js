import * as ActionTypes from './ActionTypes';

export const Comments = (state = { loading : true,
  errMess: null,
  comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, loading: false, errMess: null, comments: action.comments};

    case ActionTypes.ADD_NEW_COMMENT:
        return { ...state, comments: state.comments.concat(action.comment)};

    case ActionTypes.COMMENTS_LOADING:
      return {...state, loading: false, errMess: null, comments:[]};

    case ActionTypes.COMMENTS_FAILURE:
      return {...state, loading: true, errMess: action.errMess, comments:[]};

    default:
      return state;
  }
};