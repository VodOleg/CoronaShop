import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from '../../Common/SimpleStateManager';
import Wrap from '../../Common/Wrap';
import '../../Components/SellerPage/SellerPage.css';
import SimpleMessageModal from '../SimpleMessageModal/SimpleMessageModal';
import BE from '../../Common/comm';

export default class CheckOutForm extends Component {
    constructor(props){
        super(props);
        this.backToManagerCB = props.backToManagerCB;
        this.submitCB = props.submitCB;
        this.state = {
            form:{
                isValid:false,
            },
            mName:props.data ? props.data.Name : "" ,
            mPhoneNumber: props.data ? props.data.mPhoneNumber : "",
            mAddress: props.data ? props.data.mAddress : "",
            mBuyerEmail: props.data? props.data.mBuyerEmail : ""
            
        }

    }

    renderItemCreationForm(){
        let validated = this.state.form.isValid;

        let ele = 
        <div className="bodyDiv">
            <div className="bodyContent">
        <Form className="createShopForm" noValidate validated={validated} onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="full name"
              name="mName"
              value = {this.state.mName}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="phone"
              name="mPhoneNumber"
              value = {this.state.mPhoneNumber}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group controlId="validationCustomUsername">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Image URL"
                aria-describedby="inputGroupPrepend"
                required
                name="mBuyerEmail"
                value = {this.state.mBuyerEmail}
                onChange = {this.handleInputChange.bind(this)}
              />
              
              <Form.Control.Feedback type="invalid">
                This link is already taken.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          
        </Form.Row>
        <Form.Row>
        <Form.Group controlId="ItemDescription">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    name="mAddress"
                    value = {this.state.mAddress}
                    onChange = {this.handleInputChange.bind(this)}
                   />
          </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group>
        <Button type="submit">Confirm</Button>
        <Button type="button" variant="secondary" onClick={()=>this.backToManagerCB()}>Back</Button>


        </Form.Group>
        </Form.Row>
      </Form>
      </div>
      </div>
      return ele;
    }


    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            console.log("Invalid form , handle "+ form.checkValidity())
        }else{
            this.setValidated(true);
            let items = {
                Name: this.state.mName,
                mPhoneNumber : this.state.mPhoneNumber,
                mBuyerEmail: this.state.mBuyerEmail,
                mAddress: this.state.mAddress
            }
            this.submitCB(items);
            this.backToManagerCB();
        }

    };

    setValidated(isValidated){
        this.setState({
            form:{
                isValid:isValidated
            }
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
                [name]: value
        });
      }


    render() {
        return (
            <Wrap>
                {this.renderItemCreationForm()}
            </Wrap>
        )
    }
}
