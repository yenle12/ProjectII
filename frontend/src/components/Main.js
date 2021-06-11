import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { login, logout, signup, deleteUser, postUser, getDrinks, postDrink, 
		getComments, postComment, deleteComment, deleteDrink, updateDrink, 
		postFeedback, deleteFeedback, getUsers, getFeedbacks, getMembers,
		postMember, deleteMember } from '../redux/ActionCreators';
import Header from './Header';
import ManageUsers from './ManageUsers'
import ManageFeedbacks from './ManageFeedbacks'
import ContactUs from './ContactUs';
import Home from './Home';
import Menu from './Menu';
import MenuItem from './MenuItem';
import AboutUs from './AboutUs';



const mapStateToProps = (state) => {
  return {
    drinks: state.drinks,
    comments: state.comments,
    feedbacks: state.feedbacks,
    user: state.user,
    users: state.users,
    members: state.members,
  }
}

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: (user) => dispatch(signup(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
    postUser: (userInfo) => dispatch(postUser(userInfo)),
    getDrinks: () => dispatch(getDrinks()),
    postDrink: (drink) => dispatch(postDrink(drink)),
    getComments: () => dispatch(getComments()),
    postComment: (comment) => dispatch(postComment(comment)),
    deleteComment: (comment)=>dispatch(deleteComment(comment)),
    deleteDrink: (drink) => dispatch(deleteDrink(drink)),
    updateDrink: (drink) => dispatch(updateDrink(drink)),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    deleteFeedback: (feedback) => dispatch(deleteFeedback(feedback)),
    getFeedbacks : () => dispatch(getFeedbacks()),
    getUsers : () => dispatch(getUsers()),
    getMembers: () => dispatch(getMembers()),
    postMember: (member) =>dispatch(postMember(member)),
    deleteMember: (member) =>dispatch(deleteMember(member)),
});


class Main extends Component {
	 componentDidMount() {
	 	this.props.getDrinks();
	 	this.props.getComments();
	 	this.props.getUsers();
	 	this.props.getFeedbacks();
	 	this.props.getMembers();
	 }

	render() {
	const DrinkDetail = ({match}) => {
		return (<MenuItem drink = {this.props.drinks.drinks.filter((drink) => drink._id === match.params.drinkId)[0]}
		                 comments = {this.props.comments.comments.filter((comment) => comment.drink === match.params.drinkId)}
		                 postComment = {this.props.postComment}
		                 user = {this.props.user}
		                 deleteComment = {this.props.deleteComment}/>);
	}

	return (
	  <div>
	    <Header login = {this.props.login}
	            user = {this.props.user}
	            logout = {this.props.logout}
	            signup = {this.props.signup}
	    />
	    <Switch>
	      <Route path="/home" component = {Home}/>
	      <Route exact path="/menu" component = {() => <Menu user = {this.props.user}
	                                                   drinks = {this.props.drinks}
	                                                   postDrink = {this.props.postDrink}
	                                                   deleteDrink = {this.props.deleteDrink}
	                                                   updateDrink = {this.props.updateDrink}/>}/>
	      <Route path = "/menu/:drinkId" component= {DrinkDetail} />
	      <Route exact path="/aboutus" component={() => <AboutUs members = {this.props.members}
	      														 user = {this.props.user}
	      														 postMember = {this.props.postMember}
	      														 deleteMember = {this.props.deleteMember}/>} />
	      <Route exact path="/manageusers" component={() => <ManageUsers users = {this.props.users} 
	                                                                     deleteUser = {this.props.deleteUser}
	                                                                     postUser = {this.props.postUser}/>} />
	      <Route exact path="/contactus" component={() => <ContactUs postFeedback={this.props.postFeedback} />} />
	      <Route exact path="/managefeedbacks" component={() => <ManageFeedbacks feedbacks = {this.props.feedbacks} 
	                                                                     deleteFeedback = {this.props.deleteFeedback}
	                                                                     />} />
	      <Redirect to="/home" />
	    </Switch>
	  </div>
	);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
