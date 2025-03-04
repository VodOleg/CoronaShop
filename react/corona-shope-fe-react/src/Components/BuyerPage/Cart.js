import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './Cart.css';
import {InputGroup, Button, FormControl, Container, Grid,Row, Table} from 'react-bootstrap';

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.CheckOutCB = props.CheckOutCB;
        this.state = {
            itemsInCart:0,
            orderConfirmed: false
        }
        this.total = 0;
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
                <tr key={"cartItemRow_"+i}>
                    <td>{i}</td>
                    <td>{itemsInCart[i].Name}</td>
                    <td>{itemsInCart[i].Price}</td>
                    <td><Button variant={'danger'} size={'sm'} id={'item_in_cart_'+i} onClick={this.removeItemFromCart.bind(this)} >X</Button>  </td>
                </tr>
             )
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
            
        </Wrap>
        this.total = totalCost;
        return ele;
    }

    CheckOut(cart){
        //render checkout form
        this.CheckOutCB(cart);
    }

    renderControls(){
        return <div className={"controls"}>
            <span style={{border:"1px dotted", textAlign:'center', fontWeight:'bold', color:'black'}}># {this.state.itemsInCart.length} Total:{this.total.toFixed(2)}</span><br/>
            <Button onClick={this.CheckOut.bind(this)}>Check Out</Button>
            </div>
    }
    
    render() {
        return (
            <Wrap>
                <div className="cartContainer">
                    <div className="cartInnerContainer">
                        {this.state.orderConfirmed ? <span>Order Confirmed!</span>: 
                        <Wrap>
                            <div >
                                <span><span>Your Cart </span> <span className={"gg-shopping-cart"}></span></span>
                            </div>
                            <div className="itemList">
                                {this.renderItemList()}
                            </div>
                            <div className="cartControls">
                                {this.renderControls()}
                            </div>
                        </Wrap>
                        }
                    </div>
                </div>
            </Wrap>
        )
    }
}
