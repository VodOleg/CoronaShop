import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from './../SimpleMessageModal/SimpleMessageModal';
import BE from './../../Common/comm';

export default class ShopManager extends Component {
    constructor(props){
        super(props);
        this.shopLink = props.shopLink;
        this.state = {
            data: SSM.getShop(this.shopLink),
            modal: {
                showModal: false,
                message: ""
            },
            form:{
                isValid:false
            }
            
        }

    }

    renderWelcome(){
    return <Wrap>Hey lets start making your shop { UF.isDefined(this.state.data) ? this.state.data.Name : "new shop?" }</Wrap>
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
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Tel Aviv, Israel"
              defaultValue=""
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
                <Form.Control as="textarea" rows="3" />
          </Form.Group>

        </Form.Row>
        <Button type="submit">Submit form</Button>
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
        }

        this.setValidated(true);
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

    checklinkValidity =(event) =>{
        const textInput = event.currentTarget;
        BE.shopLinkIsUsed(textInput.value).then((res)=>{
            if (!res){
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
                {UF.isDefined(this.state.data) ? this.renderWelcome() : this.renderShopCreationForm()}
            </Wrap>
        )
    }
}
