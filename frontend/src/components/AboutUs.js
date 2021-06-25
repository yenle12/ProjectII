import React, { Component } from 'react';
import { Container, Row, Button, Modal, ModalHeader, ModalBody, 
	Input, Label, Form, FormGroup, Media, Card, CardImg, CardBody, 
    CardTitle } from 'reactstrap';//có thể xài bằng JSX thì nó tạo lối tắt luôn
import Image from 'react-bootstrap/Image'
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';//có thể xài bằng JSX
import { Player } from 'video-react';



const RenderMember = ({member, deleteMember, user}) => { //arrow function, hàm này là hàm định nghĩa hiển thị trên web app
    return(
        <>
        <br/>
        <div style = {{width:'100%', display: 'flex'}}>
            <div style = {{width:'35%'}}>
                <Image src={baseUrl+"images/"+member.image} roundedCircle className= "member-img"/>
            </div>
            <div style = {{width:'65%'}}>          
                <h3>{member.firstname}  {member.lastname}</h3>
                <p>{member.description}</p>
                <p>Email: {member.email}</p>
                <p>Tel.: {member.tel}</p>
                {user.user && user.user.isAdmin?
                    <>
                    {/* <p>Email: {member.email}</p>
                    <p>Tel.: {member.tel}</p> */}
                    <Button outline color="danger" size="sm" onClick={() => deleteMember(member)}> 
                        DELETE MEMBER
                    </Button>
                    </>
                    : null
                }
            </div >                      
        </div> 
        <br/>
        </>
    );
}

class AddMemberForm extends Component {
    //constructor dùng props để truyền giá trị, lưu trạng thái biến ban đầu 
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
        };  
        this.toggleModal = this.toggleModal.bind(this);   
        this.handleAddMember= this.handleAddMember.bind(this);  
    }

    toggleModal() {
      this.setState({
        modalIsOpen: !this.state.modalIsOpen  //ấn vào để chuyển đổi kiểu trạng thái hiện có
      });
    }

    handleAddMember(event){
        this.toggleModal();
        this.props.postMember({firstname: this.firstname.value, lastname: this.lastname.value, 
                            email: this.email.value, tel: this.tel.value,
                            image: this.image.value, description: this.description.value,
                           }); 
    }

    render (){
         return ( 
            <>
            { (this.props.user.loggedIn && this.props.user.user.isAdmin)?  //nếu là admin thì có thể thêm thành viên
                <Button color="success" onClick={this.toggleModal}>
                    Add MEMBER
                </Button>
                : null
            }
            <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>ADD MEMBER</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleAddMember}>
                        <FormGroup>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input type="text" id="firstname" name="firstname"
                                innerRef={(input) => this.firstname = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input type="text" id="lastname" name="lastname"
                                innerRef={(input) => this.lastname = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="email" name="email"
                                innerRef={(input) => this.email = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="tel">Tel. </Label>
                            <Input type="text" id="tel" name="tel"
                                innerRef={(input) => this.tel = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input type="textarea" id="description" name="description"
                                innerRef={(input) => this.description = input}  />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="image">Image</Label>
                            <Input type="text" id="image" name="image"
                                innerRef={(input) => this.image = input}  />
                        </FormGroup>
                        <Button type="submit" value="submit" color="success">ADD MEMBER</Button>
                    </Form>
                </ModalBody>
            </Modal>
            </>
        );
    }
}



const AboutUsInfo = (props) => {
    return (
        <>
        <br/><br/>
        <div style = {{width:'100%', display: 'flex'}}>
            <div style = {{width:'40%'}}>
                <img src={baseUrl +"images/about_us_1.jpeg"} className= "aboutus-img" alt="aboutus1"/>
            </div>
            <div className = "aboutus-text">          
                    A Place to Rest
            </div >                      
        </div> 
        <div style={{border: '1px solid #C9C9C9'}} />
        <div style = {{width:'100%', display: 'flex'}}>
            <div className = "aboutus-text">          
                    A Place Offering High-quality Coffee
            </div >  
            <div style = {{width:'40%'}}>
                <img src={baseUrl +"images/about_us_2.jpeg"} className = "aboutus-img" alt="aboutus2"/>
            </div>          
        </div> 
        <div style={{border: '1px solid #C9C9C9'}} />
        <div style = {{width:'100%', display: 'flex'}}>
            <div style = {{width:'40%'}}>
                <img src={baseUrl +"images/about_us_3.jpeg"} className = "aboutus-img" alt="aboutus3"/>
            </div> 
            <div className = "aboutus-text">          
                    A Place to Play with Cats
            </div >           
        </div> 
        <div style={{border: '1px solid #C9C9C9'}} />
        <div style = {{width:'100%', display: 'flex'}}>
            <div className = "aboutus-text">          
                    A Place to Chat with Friends
            </div >  
            <div style = {{width:'40%'}}>
                <img src={baseUrl +"images/about_us_4.jpeg"} className = "aboutus-img" alt="aboutus4"/>
            </div>          
        </div> 
        <div style={{border: '1px solid #C9C9C9'}} />
        <div>
            <Container  style={{width:'85%'}}>
            <Player
              playsInline
              src={baseUrl + "/video/coffee_video.mp4"}
            />
            </Container>
        </div>
        </>       
     );
}

const AboutUs = (props) => {
    var members_list = props.members.members.map((member) => {
            return( <RenderMember member = {member} 
                                  deleteMember = {props.deleteMember}  
                                  user = {props.user}
                                  key = {member._id}/>);
    });

    return  (
            <>
            <Container  className=" justify-content-center" >
                <div>
                  <AboutUsInfo/>
                </div>
                <div >
                    <br/><br/><br/><br/>
                    <h2> Our Staff </h2>
                    {members_list}
                </div>
                <div>
                    <AddMemberForm user = {props.user}
                              postMember= {props.postMember}/>
                </div>
            </Container >
            </>
    );
}

export default AboutUs;
