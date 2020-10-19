import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from './../SimpleMessageModal/SimpleMessageModal';
import BE from './../../Common/comm';

export default class ShopCreationForm extends Component {
    constructor(props){
        super(props);
        this.backToManagerCB = props.backToManagerCB;
        this.state = {
            modal: {
                showModal: false,
                message: ""
            },
            form:{
                isValid:false,
            },
            mName:"",
            mLocation:"",
            mLink:"",
            mDescription:"",
            mHours:"",
            mDelivery:false,
            mTakeaway:false
            
        }

    }

    renderShopCreationForm(){
        let validated = this.state.form.isValid;

        let ele = 
        <div className="bodyDiv">
            <div className="bodyContent">
        <Form className="createShopForm" noValidate validated={validated} onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Shop Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="MyShop"
              name="mName"
              value = {this.state.mName}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Tel Aviv, Israel"
              name="mLocation"
              value = {this.state.mLocation}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Shop Link</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Shop Link"
                aria-describedby="inputGroupPrepend"
                required
                onBlur={this.checklinkValidity.bind(this)}
                name="mLink"
                value = {this.state.mLink}
                onChange = {this.handleInputChange.bind(this)}
              />
              
              <Form.Control.Feedback type="invalid">
                This link is already taken.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group controlId="ShopDescription">
                <Form.Label>Shop Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    name="mDescription"
                    value = {this.state.mDescription}
                    onChange = {this.handleInputChange.bind(this)}
                   />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Hours</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="07:00-19:00"
              name="mHours"
              value = {this.state.mHours}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
<Form.Row>
    <label>Do you support the following:&nbsp;&nbsp;</label>
  <Form.Group>
  <Form.Check
          inline
          label="Delivery"
          type={"checkbox"}
          id={`delivery_chkbox`}
          name="mDelivery"
          checked = {this.state.mDelivery}
          onChange = {this.handleInputChange.bind(this)}
      />
      <Form.Check
          inline
          label="Takeaway"
          type={"checkbox"}
          id={`takeaway_chkbox`}
          name="mTakeaway"
          checked = {this.state.mTakeaway}
          onChange = {this.handleInputChange.bind(this)}
      />

  </Form.Group>

</Form.Row>
        <Form.Row>
        <Form.Group>
        <Button type="submit">Submit form</Button>
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
            this.setState({
                modal:{
                    showModal: true,
                    message:"Some information is invalid."
                }
            })
        }else{
            this.setValidated(true);
            let shopDetails = {
                Name: this.state.mName,
                Description: this.state.mDescription,
                PlatformLink: this.state.mLink,
                Location: this.state.mLocation,
                ShopConfiguration:{
                    Hours: this.state.mHours,
                    TakeAway: this.state.mTakeaway,
                    Delivery: this.state.mDelivery
                }
            }
            let isAdded = BE.addNewShop(shopDetails);
            if (isAdded){
                this.backToManagerCB();
            }
        }

    };

    modalClosed(item){
        this.setState({
            modal:{
                showModal:false,
                message:""
            }
        })
    }

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

    checklinkValidity =(event) =>{
        const textInput = event.currentTarget;
        BE.shopLinkIsUsed(textInput.value, false).then((res)=>{
            if (res){
                this.setState({modal:{
                    showModal:true,
                    message:"This Link already in use"
                }})    
            }
        })
    }

    render() {
        return (
            <Wrap>
                {this.state.modal.showModal ? <SimpleMessageModal message={this.state.modal.message} onClose={this.modalClosed.bind(this)} /> : null}
                {this.renderShopCreationForm()}
            </Wrap>
        )
    }
}
