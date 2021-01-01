import React, { Component } from 'react';
import {UtilityFunctions as UF} from './../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';



export default class BuyerPage extends Component {

    constructor(props){
        super(props);
        this.shopData = SSM.buyerData;
    }

    render() {
        return (
            <Wrap>
                welcome traveler! <br/>
                {JSON.stringify(SSM.buyerData, null, '\t')}
            </Wrap>
        )
    }
}
