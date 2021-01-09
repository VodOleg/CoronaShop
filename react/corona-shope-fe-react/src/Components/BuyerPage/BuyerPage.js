import React, { Component } from 'react';
import {UtilityFunctions as UF, UtilityFunctions} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import SellableItem from './../SellableItem/SellableItem';
import Cart from './Cart';
import {InputGroup, Button, FormControl, Container, Row, Col} from 'react-bootstrap';
import CheckOutForm from './CheckOutForm';
import SimpleMessageModal from '../SimpleMessageModal/SimpleMessageModal';
import BE from './../../Common/comm';




export default class BuyerPage extends Component {

    constructor(props){
        super(props);
        this.shopData = SSM.buyerData;
        this.state = {
            itemsInCart :0,
            renderModal: null
        }
        window.history.replaceState(null,"",window.location.origin);
    }

    addToCart(item){
        SSM.addBuyerItem(item);
        
        
        this.setState({itemsInCart:this.state.itemsInCart+1})
    }

    closeModals(){
        this.setState({renderModal:""})
    }

    confirmCheckOut(itemForm){
        BE.makeOrder(this.shopData.shopData.PlatformLink, itemForm, SSM.getBuyerCart()).then(res=>{
            if(res){
                alert("order confirmed");
                SSM.clearBuyerCart();
                this.setState({itemsInCart:0})
            }
            else
                alert("something went wrong");
        })
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
        if (!UtilityFunctions.isDefined(this.shopData.shopData.Items)){
            return <Wrap>Data not ready!</Wrap>;
        }
        let items = this.shopData.shopData.Items;
        for (let i in items){
            itemCards.push( <SellableItem key={"shop_"+this.shopLink+"_itemID_"+items[i].Id} isOwner={false} data={items[i]} addCB={this.addToCart.bind(this)} />);
        }
        return <Wrap> {itemCards} </Wrap>;
    }

    renderMain(){
        let data = this.shopData.shopData;
        let ele = <Wrap>
            <Container>
                <Row>
                    <Col>
                        <h3>Welcome to {data.Name}!</h3><br/>
                        <span className="">{data.Description}</span> <br/><br/>
                        <span className="shopDetails" style={{fontWeight:"bold"}}>Location: {data.Location}</span> <br/>
                        <span className="shopDetails" style={{fontWeight:"bold"}}>Link: {data.PlatformLink}</span> <br/>
                        <span className="shopDetails" style={{fontWeight:"bold"}}>Work Hours: {data.ShopConfiguration.Hours}</span> <br/>
                        <span className="shopDetails" style={{fontWeight:"bold"}}>Take Away: {data.ShopConfiguration.TakeAway ? 'v' : 'x'}</span> <br/>
                        <span className="shopDetails" style={{fontWeight:"bold"}}>Delivery: {data.ShopConfiguration.Delivery ? 'v' : 'x'}</span> <br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderItems()}
                    </Col>
                </Row>
            </Container>
        </Wrap>
        return ele;
    }

    render() {
        return (
            <Wrap>
                {UF.isDefined(this.state.renderModal) ? this.renderModal() : null }
                <Container fluid>
                    <Row>
                        <Col sm={10}>
                            {this.renderMain()}
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
