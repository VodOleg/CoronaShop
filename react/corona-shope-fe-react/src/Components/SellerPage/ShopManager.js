import React, { Component } from 'react'
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from './../SimpleMessageModal/SimpleMessageModal';
import ShopCreationForm from './ShopCreationForm';
import ShopPage from './ShopPage';

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
    return <Wrap>
    <ShopPage 
    shopLink={this.shopLink} 
    shopData={this.state.data}
    backToManagerCB={this.backToManagerCB}
    />
    </Wrap>
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
