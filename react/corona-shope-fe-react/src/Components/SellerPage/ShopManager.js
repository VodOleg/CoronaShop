import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from './../SimpleMessageModal/SimpleMessageModal';
import BE from './../../Common/comm';
import ShopCreationForm from './ShopCreationForm';

export default class ShopManager extends Component {
    constructor(props){
        super(props);
        this.shopLink = props.shopLink;
        this.backToManagerCB = props.backToManagerCB;
        this.state = {
            data: SSM.getShop(this.shopLink),
            modal: {
                showModal: false,
                message: ""
            },
            form:{
                isValid:false
            },
            redirect:false
            
        }

    }

    renderWelcome(){
    return <Wrap>Hey lets start making your shop { UF.isDefined(this.state.data) ? this.state.data.Name : "new shop?" }</Wrap>
    }

    renderShopCreationForm(){
    let ele = <ShopCreationForm backToManagerCB={this.backToManagerCB}/>;
    return ele;
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
