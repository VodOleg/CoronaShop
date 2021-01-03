import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './Cart.css';
import {InputGroup, Button, FormControl, Container, Grid,Row, Table} from 'react-bootstrap';

export default class Cart extends Component {

    constructor(props){
        super(props);
        
    }
    componentDidUpdate(props){

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
                </tr>
                {/* <span>{itemsInCart[i].Name} {itemsInCart[i].Price}</span>
                <br /> */}
            </Wrap> )
        }
        items.push(
            <tr>
                    <td>Total</td>
                    <td>{itemsInCart.length}</td>
                    <td>{totalCost.toFixed(2)}</td>
                </tr>
        )
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
        return ele;
    }

    renderControls(){
        return <Button>Check Out</Button>
    }

    render() {
        console.log("rendering Cart!");
        return (
            <Wrap>
                <div className="cartContainer">
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
