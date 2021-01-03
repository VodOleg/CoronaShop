import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import SellableItem from './../SellableItem/SellableItem';
import Cart from './Cart';
import {InputGroup, Button, FormControl, Container, Row, Col} from 'react-bootstrap';




export default class BuyerPage extends Component {

    constructor(props){
        super(props);
        this.shopData = SSM.buyerData;
        this.state = {
            itemsInCart :0
        }
    }

    addToCart(item){
        // console.log(item);
        SSM.addBuyerItem(item);
        
        // newCartList.push(item);
        this.setState({itemsInCart:this.state.itemsInCart+1})
    }

    renderItems(){
        let itemCards = [];
        let items = this.shopData.shopData.Items;
        console.log(items);
        for (let i in items){
            console.log(items[i].Name);
            itemCards.push( <SellableItem key={"shop_"+this.shopLink+"_itemID_"+items[i].Id} isOwner={false} data={items[i]} addCB={this.addToCart.bind(this)} />);
        }
        return <Wrap> {itemCards} </Wrap>;
    }

    render() {
        return (
            <Wrap>
                <Container fluid>
                    <Row>
                        <Col sm={8}>
                            {this.renderItems()}
                        </Col>
                        <Col sm={4} style={{position:"fixed", marginLeft:"80%"}}>
                            <Cart itemsArr={this.shopData.shopData.Items} inCartList={this.state.itemsInCart} />
                        </Col>
                    </Row>

                    {/* <Row>
                        <Col>
                welcome traveler! <br/>
                        </Col>
                        <Col style={{position:"fixed"}}>
                        </Col>
                    </Row>
                    <Row>

                    </Row> */}
                </Container>
            </Wrap>
        )
    }
}
