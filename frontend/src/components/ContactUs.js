import React, { Component } from 'react';
import { Row, Button, Modal, ModalHeader, ModalBody, 
	Input, Label, Form, FormGroup } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

class AddFeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.handleAddFeedback = this.handleAddFeedback.bind(this);  
    }


    handleAddFeedback(event){
      this.props.postFeedback({name: this.name.value,  email: this.email.value,
                           tel: this.tel.value, subject: this.subject.value,
                           message: this.message.value, viaEmail: this.viaEmail.checked,
                           viaPhone: this.viaPhone.checked}); 

    }

    render (){
         return ( 
            <>
            <br/>
            <div style={{border: '1px solid #C9C9C9'}} />
            <br/><br/>
            <h4> Feedback </h4>
            <Form onSubmit={this.handleAddFeedback}>
                <FormGroup>
                    <Label htmlFor="name">Full Name</Label>
                    <Input type="text" id="name" name="name"
                        innerRef={(input) => this.name = input}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" name="email"
                        innerRef={(input) => this.email = input}  />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="tel">Tel. (Optinal)</Label>
                    <Input type="text" id="tel" name="tel"
                        innerRef={(input) => this.tel = input}  />
                </FormGroup>
                <FormGroup>
                  <Label for="subject">Subject (Optinal)</Label>
                    <Input type="text" id="subject" name="subject"
                        innerRef={(input) => this.subject= input}  />
                </FormGroup>
                <FormGroup>
                  <Label for="message">Message</Label>
                    <Input type="textarea" id="message" name="message" style={{height: "200px"}}
                        innerRef={(input) => this.message = input}  />
                </FormGroup>
                <FormGroup check inline>
                    <Input type="checkbox" name="viaEmail" id="viaEmail"
                           innerRef={(input) => this.viaEmail = input}>
                    </Input>
                    <Label for="viaEmail">Can we contact you via email? 
                    </Label>
                </FormGroup>
                <FormGroup check inline>    
                    <Input type="checkbox" name="viaPhone" id="viaPhone"
                           innerRef={(input) => this.viaPhone = input}>
                    </Input>
                    <Label for="viaPhone">Can we contact you via phone? 
                    </Label>
                </FormGroup>
                <FormGroup>   
                <Button type="submit" value="submit" color="success">SEND FEEDBACK</Button>
                </FormGroup>
            </Form>
            </>
        );
    }
}



const ContactInfo = (props) => {
    return (
        <>
        <br/><br/>
        <h4> Contact Info </h4>
        <p> Address: Unit #2, 9 YangGuangLvYuan, ZhongHe Road </p>
        <p> Tel: 189970917**  &nbsp;  183018315** </p>
        <p> Hours: Sunday:    11:30–22:30 </p>
        <p> &emsp;&emsp; Monday:   11:30–22:30</p>
        <p> &emsp;&emsp; Tuesday: Closed </p>
        <p> &emsp;&emsp; Wednesday:   11:30–22:30 </p>
        <p> &emsp;&emsp; Thursday:    11:30–22:30 </p>
        <p> &emsp;&emsp; Friday:  11:30–22:30 </p>
        <p> &emsp;&emsp; Saturday:    11:30–22:30 </p>
        </>        
     );
}

const ContactUs =(props) => {
    return  (
            <>
            <Row className=" justify-content-center" >
            <div className="col-10 col-sm-10">
              <ContactInfo/>
            </div>
            </Row>
            <Row className=" justify-content-center" >
                <div className="col-10 col-sm-10">
            	  <AddFeedbackForm postFeedback = {props.postFeedback}/>
                </div>
              </Row>
            </>
    );
}

export default ContactUs;
