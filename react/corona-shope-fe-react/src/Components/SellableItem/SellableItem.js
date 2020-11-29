import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import BE from '../../Common/comm';




export default class SellableItem extends Component {

    constructor(props){
        super(props);
        this.isOwner = props.isOwner;
        this.state = {
            data: props.data
        }
    }

    AddToCart(Id){
        console.log("AddToCart not implemented yet")
    }

    Edit(Id){
        console.log("Edit not implemented Yet")
    }

    deleteItem(itemId){
        // let pwConfirmation = prompt("Re enter your password for confirmation.");
        // BE.deleteShop(shopLink, pwConfirmation).then((res)=>{
        //     if (res){
        //         this.updateSeller();
        //         alert("shop deleted");
        //     }else{
        //         alert("failed deleting shop.")
        //     }
        // });
        console.log("not implemented Yet")
    }
    
    renderItem(){
        let ele = 
        <Card style={{ width: '18rem', margin:"2% 2%", float:"left" }} key={this.state.data.Id+this.state.data.Name}>
            <Card.Img style={{maxWidth:"200px", maxHeight:"150px"}} variant="top" src={this.state.data.ImgLink} />
            <Card.Body>
                <Card.Title>{this.state.data.Name}</Card.Title>
                <Card.Text>
                    {this.state.data.Description}<br />{this.state.data.Price}/{this.state.data.Unit}
                </Card.Text>
                {   this.isOwner ? 
                    <Wrap>
                        <Button variant="light" onClick={()=>this.Edit(this.state.data.Id)}>Manage</Button>
                        <Button variant="danger" size="sm" onClick={()=>{this.deleteItem(this.state.data.Id)}}>Delete</Button>
                    </Wrap>
                    :
                    <Button variant="light" onClick={()=>this.AddToCart(this.state.data.Id)}>Add</Button>
                }
            </Card.Body>
        </Card>

        return ele;
    }


    render() {
        return (
            <Wrap>
                {this.renderItem()}
            </Wrap>
        )
    }
}
