import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './Cart.css';
import {InputGroup, Button, FormControl, Container, Grid,Row, Table} from 'react-bootstrap';

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            itemsInCart:0
        }
    }
    componentDidUpdate(props){

    }

    removeItemFromCart(item){
        
        let itemIndex = parseInt(item.target.id.substring(item.target.id.lastIndexOf("_")+1));
        
        SSM.removeBuyerItem(itemIndex);
        
        this.setState({itemsInCart:this.state.itemsInCart-1})
        
    }

    renderItemList(){
        let items = [];
        let itemsInCart = {...SSM.getBuyerCart()};
        let totalCost = 0;
        for (let i in itemsInCart){
            totalCost += parseFloat(itemsInCart[i].Price);
            items.push(
            <Wrap>
                <tr>
                    <td>{i}</td>
                    <td>{itemsInCart[i].Name}</td>
                    <td>{itemsInCart[i].Price}</td>
                    <td><Button variant={'danger'} size={'sm'} id={'item_in_cart_'+i} onClick={this.removeItemFromCart.bind(this)} >X</Button>  </td>
                </tr>
            </Wrap> )
        }
        let cartTable = 
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
            </Table>;
        let ele = <Wrap>
            {cartTable}
            <span style={{border:"1px dotted", textAlign:'center', fontWeight:'bold'}}># {itemsInCart.length} Total:{totalCost.toFixed(2)}</span>
        </Wrap>
        return ele;
    }

    CheckOut(cart){
        console.log(SSM.getBuyerCart());
    }

    renderControls(){
        return <div style={{margin:'auto'}}><Button onClick={this.CheckOut.bind(this)}>Check Out</Button></div>
    }

    render() {
        return (
            <Wrap>
                <div className="cartContainer">
                    <span style={{display:"inline-block"}}><span>Your Items </span> <span className={"gg-shopping-cart"}></span></span>
                    <div className="cartInnerContainer">
                        <div className="itemList">
                            {this.renderItemList()}
                        </div>
                        <div className="cartControls">
                            {this.renderControls()}
                        </div>
                    </div>
                </div>
            </Wrap>
        )
    }
}
