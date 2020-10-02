import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';

export default class SellerPage extends Component {
    constructor(props){
        super(props);
        this.email = SSM.getUserEmail();
        
    }

    navigate(where){
        switch(where){
            case "newShop":
                console.log("redirect to create new shop.. Modal ?");
                break;
            default:
                console.log("navigate to " + where+ " is not supported yet.")
        }
    }

    renderAddShopAction(){
        let ele = <div className="addShopDiv">
            <h6 style={{textAlign:"center"}}>Add new shop</h6>
            <div className="addShopDivInner" id="newShop" onClick={()=>this.navigate("newShop")}>
                <h1>+</h1>
            </div>
        </div>
        return ele;
    }

    renderShops(){
        let shopsCards = [];
        let shops = SSM.getUserData().Shops;
        for (let i in shops){
            shopsCards.push(this.renderCard(shops[i]));
        }
        shopsCards.push(this.renderAddShopAction());
        return <Wrap> {shopsCards} </Wrap>;
    }

    renderCard(shop){
        if (!UF.isDefined(shop)){
            return '';
        }
        let ele = 
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={shop.themePictureUrl} />
            <Card.Body>
                <Card.Title>{shop.Name}</Card.Title>
                <Card.Text>
                    {shop.Description}
                </Card.Text>
                <Button variant="light">Manage</Button>
                <Button variant="danger" size="sm">Delete</Button>
            </Card.Body>
        </Card>

        return ele;
    }

    renderWelcome(){
        let ele = <Wrap>
            <div className="sellerheader">
                <h2>Welcome back {this.email}!</h2>
            </div>
            <div className="bodyDiv">
                <div className="bodyTitle">
                    this is your main page, here you can add and managed your shops.
                </div>
                <div className="bodyContent">
                    {this.renderShops()}
                </div>
            </div>
        </Wrap>
        return ele;
    }
    render() {
        return (
            <Wrap>
                {this.renderWelcome()}
            </Wrap>
        )
    }
}
