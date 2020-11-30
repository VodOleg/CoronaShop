import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from '../../Common/SimpleStateManager';
import Wrap from '../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from '../SimpleMessageModal/SimpleMessageModal';
import BE from '../../Common/comm';

export default class ItemForm extends Component {
    constructor(props){
        super(props);
        this.backToManagerCB = props.backToManagerCB;
        this.state = {
            form:{
                isValid:false,
            },
            mName:"",
            mId:"",
            mCategory:"",
            mDescription:"",
            mImgLink:"",
            mPrice:"",
            mUnit:""
            
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
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="myItem"
              name="mName"
              value = {this.state.mName}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Books"
              name="mCategory"
              value = {this.state.mCategory}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group controlId="validationCustomUsername">
            <Form.Label>Image Link</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Image URL"
                aria-describedby="inputGroupPrepend"
                required
                name="mImgLink"
                value = {this.state.mImgLink}
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
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    name="mDescription"
                    value = {this.state.mDescription}
                    onChange = {this.handleInputChange.bind(this)}
                   />
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              name="mPrice"
              value = {this.state.mPrice}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group controlId="validationCustom02">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              name="mUnit"
              value = {this.state.mUnit}
              onChange = {this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
            console.log("Invalid form , handle")
        }else{
            this.setValidated(true);
            // let shopDetails = {
            //     Name: this.state.mName,
            //     Description: this.state.mDescription,
            //     PlatformLink: this.state.mLink,
            //     Location: this.state.mLocation,
            //     ShopConfiguration:{
            //         Hours: this.state.mHours,
            //         TakeAway: this.state.mTakeaway,
            //         Delivery: this.state.mDelivery
            //     }
            // }
            // let isAdded = BE.addNewShop(shopDetails);
            // if (isAdded){
            //     this.backToManagerCB();
            // }
            console.log("TODO: add item to BE + assign ID logic")
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
