import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar,  Collapse,  Nav, NavItem,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';



class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsOpen: false,
            loginModalOpen: false,
            signupModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    toggleNav() {
      this.setState({
        navIsOpen: !this.state.navIsOpen
      });
    }

    toggleLoginModal() {
      this.setState({
        loginModalOpen: !this.state.loginModalOpen
      });
    }

    toggleSignupModal() {
      this.setState({
        signupModalOpen: !this.state.signupModalOpen
      });
    }


    handleLogin(event) {
        this.toggleLoginModal();
        this.props.login({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }

    handleLogout(event) {
        this.props.logout();
        event.preventDefault();
    }

    handleSignup(event){
        this.toggleSignupModal();
        this.props.signup({username: this.username.value, password: this.password.value,
                           email: this.email.value, firstname: this.firstname.value,
                           lastname: this.lastname.value, nickname: this.nickname.value});
        event.preventDefault();
    }

    render (){
      return  (
            <React.Fragment>
                <Navbar light expand="md">
                    <div className="container">
                        <Collapse isOpen={this.state.navIsOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'>
                                    Home
                                </NavLink>
                            </NavItem>
                             <NavItem>
                                <NavLink className="nav-link" to='/aboutus'>
                                    About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'>
                                     Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'>
                                    Contact Us
                                </NavLink>
                            </NavItem>
                            { (this.props.user.loggedIn && this.props.user.user.isAdmin)?
                                <>
                                <NavItem>
                                    <NavLink className="nav-link" to='/manageusers'>
                                        Manage Users
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/managefeedbacks'>
                                        Manage Feedbacks
                                    </NavLink>
                                </NavItem>
                                </>
                                : null
                            }
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.user.loggedIn ?
                                      <div>
                                      <Button outline onClick={this.toggleLoginModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                          {this.props.user.loading ?
                                              <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                              : null
                                          }
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button outline onClick={this.toggleSignupModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Signup
                                          {this.props.user.loading ?
                                              <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                              : null
                                          }
                                        </Button>
                                      </div>
                                      :
                                      <div>
                                        <div className="navbar-text mr-3">{this.props.user.user.username}</div>
                                        <Button outline onClick={this.handleLogout}>
                                        <span className="fa fa-sign-in fa-lg"></span> Logout
                                        </Button>
                                      </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.loginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.signupModalOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>Singup</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email"
                                    innerRef={(input) => this.email = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">Firstname</Label>
                                <Input type="firstname" id="firstname" name="firstnamel"
                                    innerRef={(input) => this.firstname = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input type="lastname" id="lastname" name="lastname"
                                    innerRef={(input) => this.lastname = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="nickname">Nickname</Label>
                                <Input type="nickname" id="nickname" name="nickname"
                                    innerRef={(input) => this.nickname = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="success">Signup</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>

      );
    }
}

export default Header;
