import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup} from 'reactstrap';

function RenderUser({ user, setSelectedUser }) {
    return(
      <tr key = {user._id}>
        <td><input type="radio" name="userRadio" onChange ={()=>setSelectedUser(user)}/></td>
        <td>{user.username}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td>{user.nickname}</td>
        <td>{user.isAdmin? 'Yes':'No'}</td>
      </tr>
    );
}

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser : null,
            adduserModalOpen: false
        };
        this.setSelectedUser = this.setSelectedUser.bind(this);
        this.toggleAdduserModal = this.toggleAdduserModal.bind(this);
        this.handleAdduser = this.handleAdduser.bind(this);
    }

    setSelectedUser(user){
       this.setState({
          selectedUser :user
       });
    }

    toggleAdduserModal() {
      this.setState({
        adduserModalOpen: !this.state.adduserModalOpen
      });
    }

    handleAdduser(event){
        this.toggleAdduserModal();
        console.log("#################")
        console.log(this.isAdmin.value)
        console.log("#################")
        this.props.postUser({username: this.username.value, password: this.password.value,
                           email: this.email.value, firstname: this.firstname.value,
                           lastname: this.lastname.value, nickname: this.nickname.value,
                           isAdmin: this.isAdmin.value});
        event.preventDefault();
    }

    render (){
        return  (
            <>
            <Table>
                  <thead>
                      <tr>
                          <th> </th> 
                          <th> Username </th>
                          <th> Firstname </th>
                          <th> Lastname </th>
                          <th> Email </th>
                          <th> Nickname </th>
                          <th> is Admin Account </th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.props.users.users.map((user)=>{
                        return(
                            <RenderUser user = {user} setSelectedUser = {this.setSelectedUser}/>
                        );
                      })}
                  </tbody>
            </Table>
            <Button outline color="danger" onClick={() => this.props.deleteUser(this.state.selectedUser)}>
                    DELETE
            </Button>
            <Button outline color="success" onClick={this.toggleAdduserModal}>
                    ADD NEW USER
            </Button>
            <Modal isOpen={this.state.adduserModalOpen} toggle={this.toggleAdduserModal}>
                    <ModalHeader toggle={this.toggleAdduserModal}>ADD USER</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleAdduser}>
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
                            <FormGroup>
                              <Label for="adminSelect">Is an Admin Account</Label>
                                <Input type="select" name="adminSelect" id="adminSelect" 
                                       innerRef={(input) => this.isAdmin = input}>
                                  <option value ={false}>NO</option>
                                  <option value ={true}>YES</option>
                                </Input>
                            </FormGroup>

                            <Button type="submit" value="submit" color="success">ADD USER</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
      );
    }
}

export default ManageUsers;
