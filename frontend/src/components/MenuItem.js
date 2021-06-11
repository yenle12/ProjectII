import React, { Component } from 'react';
import { Row, Card, CardImg, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, 
	Input, Label, Form, FormGroup, BreadcrumbItem, Breadcrumb, CardText} from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import ReactStars from "react-rating-stars-component";



function RenderItem ({drink}){
	return(
		<div className="col-10 col-md-5 m-1">
	        <Card>
	            <CardImg src={baseUrl+"images/"+drink.image} className ="card-img-top"/>
	            <CardBody>
	                <CardTitle>{drink.name}</CardTitle>
                    <CardText>{drink.description}</CardText>
	            </CardBody>
	        </Card>
	    </div>
        
    );
}
class OrderNowForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen:false,
            count: 1
            
        };
        //if(this.state.count<0) this.state.count=0;
        this.toggleModal = this.toggleModal.bind(this);
        this.handleOrderNow = this.handleOrderNow.bind(this);
    }
    onSubmit=(event)=>{
        event.preventDefault();
         this.props.onSubmit(this.state);
         //cancel, close
         this.onClear();
         this.onCloseForm();
    
      }
      onCloseForm=()=>{
        this.props.onCloseForm();
      }
      onClear=()=>{
        this.setState({
          name :'',
          status : false
        })
      }

    toggleModal(){
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    handleOrderNow(event){
        this.toggleModal();
        this.props.postOrder({content: this.content.value, quantity: this.quantity.value,
                                drink: this.props.drink._id});        
    }
    
    increment=(event) => {
        this.setState(
            {count: this.state.count+ 1},
            event.preventDefault(event)
            )
    }
    decrement=(event) => {
        if(this.state.count>1)
        this.setState(
        {count: this.state.count- 1},
        
           event.preventDefault(event)
           
        )
    }

    message=(event) =>{
        alert('Just a minute, we will make it right now');
    }
    render(){
        return (
        <>
        { (this.props.user.loggedIn && !this.props.user.user.isAdmin)?
            <Button color="success" onClick={this.toggleModal}>
                Order now
            </Button>
            : null
        }
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Order Now</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.handleOrderNow}>
                <FormGroup>

					<button onClick={this.increment} className="counter">+</button>
                    <button onClick={this.decrement} className="counter">-</button>
                    <h2>{this.state.count}</h2>
                    </FormGroup>              
                    <FormGroup>
                        <Label htmlFor="content">Note</Label>
                        <Input type="textarea" id="content" name="content"
                            innerRef={(input) => this.content = input} />
                    </FormGroup>
                    <Button type="submit" value="submit" color="success" onClick={this.message}>ORDER</Button>
                </Form>
            </ModalBody>
        </Modal>
        </>

        
        );
    }
}
class AddCommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            modalIsOpen:false,
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
    }

    toggleModal(){
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    handleAddComment(event){
        this.toggleModal();
        this.props.postComment({content: this.content.value, rating: this.rating.value,
                                drink: this.props.drink._id});        
    }
 
    render(){
        return (
        <>
        { (this.props.user.loggedIn && !this.props.user.user.isAdmin)?
            <Button color="success" onClick={this.toggleModal}>
                Add Comment
            </Button>
            : null
        }
    
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>ADD COMMENT</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.handleAddComment}>
                    <FormGroup>
                      <Label for="ratingSelect">Rating</Label>
                        <Input type="select" name="ratingSelect" id="ratingSelect" 
                               innerRef={(input) => this.rating = input}>
                          <option value ={1}>1</option>
                          <option value ={2}>2</option>
                          <option value ={3}>3</option>
                          <option value ={4}>4</option>
                          <option value ={5}>5</option>
                        </Input>
                    </FormGroup>               
                    <FormGroup>
                        <Label htmlFor="content">Comment</Label>
                        <Input type="textarea" id="content" name="content"
                            innerRef={(input) => this.content = input} />
                    </FormGroup>
                    <Button type="submit" value="submit" color="success">ADD DRINK</Button>
                </Form>
            </ModalBody>
        </Modal>
        </>

        
        );
    }
}

function RenderComments ({drink, comments, postComment, user, deleteComment,postOrder}) {
    return (

        <div className="col-10 col-md-5 m-1">
            <h5>Comments</h5>
            <ul>
                {comments.map((comment)=>{
                    return (
                        <React.Fragment key={comment._id}>
                        <li>
                            <ReactStars value = {comment.rating}
                                    edit = {false}/>
                            {comment.content}
                            <br /> -- {comment.author.nickname}
                        </li>
                        {user.user && user.user.isAdmin?
                            <Button outline color="danger" size="sm" onClick={() => deleteComment(comment)}>
                                DELETE COMMENT
                            </Button>
                            : null
                        }
                        </React.Fragment>
                    );
                })}
            </ul>
            <br/>
            <br/>

            <AddCommentForm drink = {drink}
                            postComment={postComment}
                            user = {user}/>
            <OrderNowForm drink = {drink}
                            postOrder={postOrder}
                            user = {user}

            />
        </div>
    )
}




const MenuItem =(props) => {

    if(props.drink) {
        return ( 
            <>
            <div>
	            <Row >
	                <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.drink.name}</BreadcrumbItem>
                    </Breadcrumb>
	            </Row>
                <Row className="m-1 justify-content-center" >
                    <RenderItem drink = {props.drink}/>
                    <RenderComments drink = {props.drink}
                                    comments= {props.comments} 
                                    postComment={props.postComment}
                                    postOrder={props.postOrder}
                                    user = {props.user}
                                    deleteComment = {props.deleteComment}/>
                </Row>
            </div>
            </>
  		);
    }
    else {
        return (<></>);
    }
    

}

export default MenuItem
