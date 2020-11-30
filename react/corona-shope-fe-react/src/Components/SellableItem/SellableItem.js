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
        this.editCB = props.editCB;
        this.removeCB = props.removeCB;
        this.state = {
            data: props.data
        }
    }

    AddToCart(Id){
        console.log("AddToCart not implemented yet")
    }

    Edit(Id){
        this.editCB(Id);
    }

    deleteItem(itemId){
        this.removeCB(itemId)
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
                        <Button variant="light" onClick={()=>this.Edit(this.state.data)}>Manage</Button>
                        <Button variant="danger" size="sm" onClick={()=>{this.deleteItem(this.state.data)}}>Delete</Button>
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
