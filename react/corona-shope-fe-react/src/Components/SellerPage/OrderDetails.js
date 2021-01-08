import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import {InputGroup, Button, FormControl, Container, Grid,Row, Table} from 'react-bootstrap';

export default class OrderDetails extends Component {

    constructor(props){
        super(props);
        this.orderID = props.orderID;
        this.orderDetails = SSM.getShopOrder(props.orderID);
        this.closeCB = props.closeCB;
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

    
    render() {
        let items = [];
        let total = 0;
        for (let i in this.orderDetails.items){
            total += this.orderDetails.items[i].Price;
            items.push(
                <tr key={"itemInOrder"+i}>
                    <td>{i}</td>
                    <td>{this.orderDetails.items[i].Name}</td>
                    <td>{this.orderDetails.items[i].Id}</td>
                    <td>{this.orderDetails.items[i].Price}</td>
                </tr>
            )
        }
        return (
            <Wrap>
                <div style={{padding:"2%", margin:"2%", border:"1px dotted cyan"}}>
                    <h6>Order Details</h6>
                    Name : {this.orderDetails.OrderDetails.Name} <br/>
                    Address : {this.orderDetails.OrderDetails.mAddress} <br/>
                    Email : {this.orderDetails.OrderDetails.mBuyerEmail} <br/>
                    Phone : {this.orderDetails.OrderDetails.mPhoneNumber} <br/>
                    Time of order : {this.orderDetails.OrderTimestamp} <br/>
                    Total: {total}
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </Table>
                <div style={{margin:"auto", textAlign:"center"}}>
                    <Button variant={'secondary'} onClick={this.closeCB}>Close</Button>
                </div>
            </Wrap>
        )
    }
}
