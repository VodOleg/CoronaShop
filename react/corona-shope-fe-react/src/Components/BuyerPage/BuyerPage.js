import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import SellableItem from './../SellableItem/SellableItem';
import Cart from './Cart';
import {InputGroup, Button, FormControl, Container, Row, Col} from 'react-bootstrap';
import CheckOutForm from './CheckOutForm';
import SimpleMessageModal from '../SimpleMessageModal/SimpleMessageModal';




export default class BuyerPage extends Component {

    constructor(props){
        super(props);
        this.shopData = SSM.buyerData;
        this.state = {
            itemsInCart :0,
            renderModal: null
        }
    }

    addToCart(item){
        SSM.addBuyerItem(item);
        
        
        this.setState({itemsInCart:this.state.itemsInCart+1})
    }

    closeModals(){
        this.setState({renderModal:""})
    }

    confirmCheckOut(itemForm){
        console.log(itemForm);
        console.log(SSM.getBuyerCart())
        //send api to backend to deal with the request
        alert("order confirmed");
    }
    
    showCheckoutModal(){
        this.setState({renderModal:"CheckOutForm"});
    }

    renderModal(){
        let ele;
        switch (this.state.renderModal){
            case "CheckOutForm": 
                ele = <SimpleMessageModal onClose={this.closeModals.bind(this)} >
                    <CheckOutForm backToManagerCB={this.closeModals.bind(this)} submitCB={this.confirmCheckOut.bind(this)}/>
                </SimpleMessageModal>
                break;
            default:
                break;
        }
        return ele;
    }

    renderItems(){
        let itemCards = [];
        let items = this.shopData.shopData.Items;
        for (let i in items){
            itemCards.push( <SellableItem key={"shop_"+this.shopLink+"_itemID_"+items[i].Id} isOwner={false} data={items[i]} addCB={this.addToCart.bind(this)} />);
        }
        return <Wrap> {itemCards} </Wrap>;
    }

    render() {
        return (
            <Wrap>
                {UF.isDefined(this.state.renderModal) ? this.renderModal() : null }
                <Container fluid>
                    <Row>
                        <Col sm={10}>
                            {this.renderItems()}
                        </Col>
                        <Col sm={2} style={{position:"fixed", marginLeft:"80%"}}>
                            <Cart itemsArr={this.shopData.shopData.Items} inCartList={this.state.itemsInCart} CheckOutCB={this.showCheckoutModal.bind(this)} />
                        </Col>
                    </Row>
                </Container>
            </Wrap>
        )
    }
}
