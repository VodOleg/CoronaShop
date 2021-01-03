import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import SellableItem from './../SellableItem/SellableItem';



export default class BuyerPage extends Component {

    constructor(props){
        super(props);
        this.shopData = SSM.buyerData;
    }

    addToCart(item){
        console.log(item);
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
                <div>
                welcome traveler! <br/>
                {JSON.stringify(SSM.buyerData, null, '\t')}

                </div>
                <div>
                {this.renderItems()}

                </div>
            </Wrap>
        )
    }
}
