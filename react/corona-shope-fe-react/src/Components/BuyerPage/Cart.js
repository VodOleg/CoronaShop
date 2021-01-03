import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './Cart.css';
import {InputGroup, Button, FormControl, Container, Grid,Row} from 'react-bootstrap';

export default class Cart extends Component {

    constructor(props){
        super(props);
        
    }
    componentDidUpdate(props){

    }
    renderItemList(){
        let items = [];
        let itemsInCart = {...SSM.getBuyerCart()};
        for (let i in itemsInCart){
            items.push(
            <Wrap>
                <span>{itemsInCart[i].Name} {itemsInCart[i].Price}</span>
                <br />
            </Wrap> )
        }
        let ele = <Wrap>
            {items}
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
                    <div className="itemList">
                        {this.renderItemList()}
                    </div>
                    <div className="cartControls">
                        {this.renderControls()}
                    </div>
                </div>
            </Wrap>
        )
    }
}
