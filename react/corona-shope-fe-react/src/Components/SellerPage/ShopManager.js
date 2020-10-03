import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';

export default class ShopManager extends Component {
    constructor(props){
        super(props);
        this.shopLink = props.shopLink;
        this.state = {
            data: SSM.getShop(this.shopLink)
        }
    }

    renderWelcome(){
    return <Wrap>Hey lets start making your shop { UF.isDefined(this.state.data) ? this.state.data.Name : "new shop?" }</Wrap>
    }
    
    render() {
        return (
            <Wrap>
                {this.renderWelcome()}
            </Wrap>
        )
    }
}
