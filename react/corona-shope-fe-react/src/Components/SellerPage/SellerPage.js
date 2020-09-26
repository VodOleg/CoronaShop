import React, { Component } from 'react'
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';

export default class SellerPage extends Component {
    constructor(props){
        super(props);
        this.email = SSM.getUserEmail();
    }
    render() {
        return (
            <div>
                Welcome {this.email} ! 
            </div>
        )
    }
}
