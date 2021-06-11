import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

export const requestLogin = (user) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        user
    }
};

export const loginSuccess = (token) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token
    }
};

export const loginFailure = (errMess) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        errMess
    }
};

export const login =  (user) => {
    return async (dispatch) => {
	    dispatch(requestLogin(user));
	    console.log(user);
	    try {
		    var response = await fetch(baseUrl + 'users/login', {
		        method: 'POST',
		        headers: { 'Content-Type':'application/json' },
		        body: JSON.stringify(user)
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
	    	if (response.success) {
	    		user.isAdmin = response.isAdmin;
	            localStorage.setItem('token', response.token);
	            localStorage.setItem('user', JSON.stringify(user));
	            dispatch(loginSuccess(response.token));
	            if(user.isAdmin) {
	            	dispatch(getUsers());
	            	dispatch(getFeedbacks());
	            }
	        }
	        else {
	            var err = new Error('Error ' + response.status);
	            err.response = response;
	            throw err;
	        }

	    }
	    catch(err) {
	    	dispatch(loginFailure(err.message));
	    }
	}
};

export const requestSignup = (user) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        user
    }
};

export const signupFailure = (errMess) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        errMess
    }
};

export const signup =  (user) => {
    return async (dispatch) => {
	    dispatch(requestSignup(user));
        console.log(user);
	    try {
		    var response = await fetch(baseUrl + 'users/signup', {
		        method: 'POST',
		        headers: { 'Content-Type':'application/json' },
		        body: JSON.stringify(user)
		    });
            
		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }
            response = await response.json();
		    if (response.success) {
		    	dispatch(login({username:user.username, password:user.password}));
		    }

	    }
	    catch(err) {
	    	dispatch(signupFailure(err.message));
	    }
	}
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
};

export const logoutSuccess = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
};

export const logout = () => (dispatch) => {
	dispatch(requestLogout());
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	dispatch(getUsers());
	dispatch(getFeedbacks());
	dispatch(logoutSuccess());
}

export const getUsers =  () => {
    return async (dispatch) => {
    	dispatch(usersLoading());
    	var bearer = 'Bearer '+ localStorage.getItem('token');
	    try {

		    var response = await fetch(baseUrl + 'users/', {
		        method: 'GET',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(addUsers(response));
		}
		catch(err){
            usersFailure();
		}
    }
};

export const addUsers = (users) => ({
    type : ActionTypes.ADD_USERS,
    users
});

export const usersLoading = () => ({
	type : ActionTypes.USERS_LOADING
});

export const usersFailure = (errMess) =>({
	type : ActionTypes.USERS_FAILURE,
    errMess
});

export const deleteUser = (user) => {
	return async (dispatch) => {
		var bearer = 'Bearer '+ localStorage.getItem('token');
		try {		    

			var response = await fetch(baseUrl + 'users/'+user._id, {
		        method: 'DELETE',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(getUsers());

		}
		catch(err){
            usersFailure();
		}		
	}
};

export const postUser =  (user) => {
    return async (dispatch) => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!");
        var bearer = 'Bearer '+ localStorage.getItem('token');
	    try {
		    var response = await fetch(baseUrl + 'users/', {
		        method: 'POST',
		        headers: { 'Content-Type':'application/json' ,
		                    'Authorization': bearer},
		        body: JSON.stringify(user)
		    });
            
		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }
            response = await response.json();
		    if (response.success) {
		    	dispatch(getUsers());
		    }

	    }
	    catch(err) {
	    	dispatch(signupFailure(err.message));
	    }
	}
};

export const getDrinks =  () => {
    return async (dispatch) => {
    	dispatch(drinksLoading());
	    try {

		    var response = await fetch(baseUrl + 'menu/', {
		        method: 'GET',
		        headers: { 'Content-Type':'application/json'},
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(addDrinks(response));
		}
		catch(err){
            dispatch(drinksFailure());
		}
    }
}

export const addDrinks = (drinks) => ({
    type : ActionTypes.ADD_DRINKS,
    drinks
});

export const addNewDrink = (drink) => ({
    type : ActionTypes.ADD_NEW_DRINK,
    drink
});

export const drinksLoading = () => ({
	type : ActionTypes.DRINKS_LOADING
});

export const drinksFailure = (errMess) =>({
	type : ActionTypes.DRINKS_FAILURE,
    errMess
});

export const postDrink =  (drink) => {
    return async (dispatch) => {
        var bearer = 'Bearer '+ localStorage.getItem('token');
	    try {
		    var response = await fetch(baseUrl + 'menu/', {
		        method: 'POST',
		        headers: { 'Content-Type':'application/json' ,
		                    'Authorization': bearer},
		        body: JSON.stringify(drink)
		    });
            
		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }
            response = await response.json();
		    if (response.success) {
		    	console.log(response);
		    	dispatch(addNewDrink(drink));
		    }

	    }
	    catch(err) {
	    	dispatch(drinksFailure(err.message));
	    }
	}
};

export const deleteDrink = (drink) => {
	return async (dispatch) => {
		var bearer = 'Bearer '+ localStorage.getItem('token');
		try {		 
			var response = await fetch(baseUrl + 'menu/'+drink._id, {
		        method: 'DELETE',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(getDrinks());

		}
		catch(err){
            drinksFailure();
		}		
	}
};

export const updateDrink = (drink) => {
	return async (dispatch) => {
		var bearer = 'Bearer '+ localStorage.getItem('token');
		try {		 
			var response = await fetch(baseUrl + 'menu/'+drink._id, {
		        method: 'PUT',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		                    body: JSON.stringify(drink)
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    dispatch(getDrinks());

		}
		catch(err){
            drinksFailure();
		}		
	}
};

export const getComments =  () => {
    return async (dispatch) => {
    	dispatch(commentsLoading());
	    try {

		    var response = await fetch(baseUrl + 'comments/', {
		        method: 'GET',
		        headers: { 'Content-Type':'application/json'},
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(addComments(response));
		}
		catch(err){
            commentsFailure();
		}
    }
};

export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    comments
});

export const addNewComment = (comment) => ({
    type : ActionTypes.ADD_NEW_COMMENT,
    comment
});

export const commentsLoading = () => ({
	type : ActionTypes.COMMENTS_LOADING
});

export const commentsFailure = (errMess) =>({
	type : ActionTypes.COMMENTS_FAILURE,
    errMess
});

export const postComment =  (comment) => {
    return async (dispatch) => {
        var bearer = 'Bearer '+ localStorage.getItem('token');
	    try {
		    var response = await fetch(baseUrl + 'comments/', {
		        method: 'POST',
		        headers: { 'Content-Type':'application/json' ,
		                    'Authorization': bearer},
		        body: JSON.stringify(comment)
		    });
            
		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }
            response = await response.json();
		    if (response.success) {
		    	console.log(response);
		    	dispatch(addNewComment(comment));
		    }

	    }
	    catch(err) {
	    	dispatch(commentsFailure(err.message));
	    }
	}
};

export const deleteComment = (comment) => {
	return async (dispatch) => {
		var bearer = 'Bearer '+ localStorage.getItem('token');
		try {		 
			var response = await fetch(baseUrl + 'comments/'+comment._id, {
		        method: 'DELETE',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(getComments());

		}
		catch(err){
            commentsFailure();
		}		
	}
};

export const postFeedback =  (feedback) => {
    return async (dispatch) => {
    	console.log("eeeeeeeeeeeeeeeeeee")
    	console.log(feedback)
        var bearer = 'Bearer '+ localStorage.getItem('token');
	    try {
		    var response = await fetch(baseUrl + 'feedbacks/', {
		        method: 'POST',
		        headers: { 'Content-Type':'application/json' ,
		                    'Authorization': bearer},
		        body: JSON.stringify(feedback)
		    });
            
		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }
            response = await response.json();
		    if (response.success) {
		    	console.log("??????????????????????????????????????????");
		    	console.log(response);
		    }

	    }
	    catch(err) {
	    	dispatch(drinksFailure(err.message));
	    }
	}
};

export const getFeedbacks =  () => {
    return async (dispatch) => {
    	dispatch(feedbacksLoading());
    	var bearer = 'Bearer '+ localStorage.getItem('token');
	    try {

		    var response = await fetch(baseUrl + 'feedbacks/', {
		        method: 'GET',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(addFeedbacks(response));
		}
		catch(err){
            feedbacksFailure();
		}
    }
};

export const addFeedbacks = (feedbacks) => ({
    type : ActionTypes.ADD_FEEDBACKS,
    feedbacks
});

export const feedbacksLoading = () => ({
	type : ActionTypes.FEEDBACKS_LOADING
});

export const feedbacksFailure = (errMess) =>({
	type : ActionTypes.FEEDBACKS_FAILURE,
    errMess
});

export const deleteFeedback = (feedback) => {
	return async (dispatch) => {
		var bearer = 'Bearer '+ localStorage.getItem('token');
		try {		 
			var response = await fetch(baseUrl + 'feedbacks/'+feedback._id, {
		        method: 'DELETE',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(getFeedbacks());

		}
		catch(err){
            feedbacksFailure();
		}		
	}
};

export const addMembers = (members) => ({
    type : ActionTypes.ADD_MEMBERS,
    members
});

export const membersLoading = () => ({
	type : ActionTypes.MEMBERS_LOADING
});

export const membersFailure = (errMess) =>({
	type : ActionTypes.MEMBERS_FAILURE,
    errMess
});

export const addNewMember = (member) => ({
    type : ActionTypes.ADD_NEW_MEMBER,
    member
});

export const getMembers =  () => {
    return async (dispatch) => {
    	dispatch(membersLoading());
	    try {

		    var response = await fetch(baseUrl + 'members/', {
		        method: 'GET',
		        headers: { 'Content-Type':'application/json'},
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(addMembers(response));
		}
		catch(err){
            dispatch(membersFailure());
		}
    }
};

export const postMember =  (member) => {
    return async (dispatch) => {
        var bearer = 'Bearer '+ localStorage.getItem('token');
	    try {
		    var response = await fetch(baseUrl + 'members/', {
		        method: 'POST',
		        headers: { 'Content-Type':'application/json' ,
		                    'Authorization': bearer},
		        body: JSON.stringify(member)
		    });
            
		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }
            response = await response.json();
		    if (response.success) {
		    	console.log(response);
		    	dispatch(addNewMember(member));
		    }

	    }
	    catch(err) {
	    	dispatch(membersFailure(err.message));
	    }
	}
};

export const deleteMember = (member) => {
	return async (dispatch) => {
		var bearer = 'Bearer '+ localStorage.getItem('token');
		try {		 
			var response = await fetch(baseUrl + 'members/'+member._id, {
		        method: 'DELETE',
		        headers: { 'Content-Type':'application/json',
		                   'Authorization': bearer },
		    });

		    if (!response.ok) {
		        var err = new Error('Error ' + response.status + ': ' + response.statusText);
		        err.response = response;
		        throw err;
		    }

		    response = await response.json();
		    console.log(response);
		    dispatch(getMembers());

		}
		catch(err){
            membersFailure();
		}		
	}
};