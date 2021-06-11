import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup, Row} from 'reactstrap';

function RenderFeedback({ feedback, deleteFeedback }) {
    return(
      <tr key = {feedback._id}>
        <th></th>
          <td >{feedback.name}</td>
          <td >{feedback.email}</td>
          <td >{feedback.viaEmail? 'Yes':'No'}</td>
          <td >{feedback.tel}</td>
          <td >{feedback.viaPhone? 'Yes':'No'}</td>
          <td >{feedback.subject}</td>
          <td style={{maxWidth: '500px'}}>{feedback.message}</td>
          <td >
            <Button outline color="danger" onClick={() => deleteFeedback(feedback)}>
            DELETE
            </Button>
          </td>
      </tr>

    );
}

function ManageFeedbacks (props){
        return  (
            <>
            <Table responsive>
                  <thead>
                      <tr>
                          <th> </th> 
                          <th> Name </th>
                          <th> Email </th>
                          <th> Via Email </th>
                          <th> Tel </th>
                          <th> Via Phone </th>
                          <th> Subject </th>
                          <th> Message </th>
                      </tr>
                  </thead>
                  <tbody>
                      {props.feedbacks.feedbacks.map((feedback)=>{
                        return(
                            <RenderFeedback feedback = {feedback} deleteFeedback = {props.deleteFeedback}/>
                        );
                      })}
                  </tbody>
            </Table>
            </>
      );
}


export default ManageFeedbacks;
