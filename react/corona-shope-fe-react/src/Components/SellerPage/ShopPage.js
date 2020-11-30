import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup, Modal } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from './../SimpleMessageModal/SimpleMessageModal';
import BE from './../../Common/comm';
import ShopCreationForm from './ShopCreationForm';
import SellableItem from './../SellableItem/SellableItem';
import ItemForm from './ItemForm';

export default class ShopPage extends Component {
    constructor(props){
        super(props);
        this.shopLink = props.shopLink;
        this.shopData = props.shopData;
        
        this.backToManagerCB = props.backToManagerCB;
        this.state = {
            renderModal: ""
        }

    }

    renderItems(){
        let itemCards = [];
        let items = this.shopData.Items; 
        for (let i in items){
            itemCards.push( <SellableItem key={"shop_"+this.shopLink+"_itemID_"+items[i].Id} isOwner={true} data={items[i]} />);
        }
        itemCards.push(this.renderAddItemAction());
        return <Wrap> {itemCards} </Wrap>;
    }

    renderAddItemAction(){
        let ele = <div className="addShopDiv" key="newItem">
            <h6 style={{textAlign:"center"}}>Add new item</h6>
            <div className="addShopDivInner" id="newItem" onClick={()=>this.addNewItemForm()}>
                <h1>+</h1>
            </div>
        </div>
        return ele;
    }

    addNewItemForm(){
        //show modal
        this.setState({
            renderModal:"newItem"
        })

    }

    closeModals(){
        this.setState({renderModal:""})
    }

    setRenderModal(modalName){
        let ele ;
        switch(modalName){
            case "newItem":
                ele = <SimpleMessageModal onClose={this.closeModals.bind(this)} >
                    <ItemForm backToManagerCB={this.closeModals.bind(this)} />
                </SimpleMessageModal>
        }
        return <Wrap>{ele}</Wrap>;
    }

    renderWelcome(){
        let ele = <Wrap>
            <div className="sellerheader">
                <h2>Let's Work on Your Shop!</h2>
            </div>
            <div className="bodyDiv">
                <div className="bodyControls">
                <Button type="button" variant="secondary" onClick={()=>this.backToManagerCB()}>Back</Button>

                </div>
                <div className="bodyTitle">
                    this is your main page, here you can add and managed your Items in shop. <span onClick={()=>{this.updateSeller()}} style={{color:"blue", cursor:"pointer"}}>Refresh</span>
                </div>
                <div className="bodyContent">
                    {this.renderItems()}
                </div>
            </div>
        </Wrap>
        return ele;
    }

    render() {
        return (
            <Wrap>
                {UF.isNonEmptyString(this.state.renderModal) ? this.setRenderModal(this.state.renderModal) : null}
                {this.renderWelcome()}
            </Wrap>
        )
    }
}
