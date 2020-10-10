import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import { Redirect } from 'react-router-dom';
import ShopManager from './ShopManager';



export default class SellerPage extends Component {

    constructor(props){
        super(props);
        this.email = SSM.getUserEmail();
        this.state = {
            page : "main"
        }
        
    }

    navigate(where){
        switch(where){
            case "newShop":
                this.setState({page:""})
                break;
            default:
                this.setState({page:where})
                console.log("navigate to " + where+ " is not supported yet.")
                break;
        }
    }

    renderAddShopAction(){
        let ele = <div className="addShopDiv" key="newShop">
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
        <Card style={{ width: '18rem', margin:"2% 2%", float:"left" }} key={shop.PlatformLink}>
            <Card.Img variant="top" src={shop.themePictureUrl} />
            <Card.Body>
                <Card.Title>{shop.Name}</Card.Title>
                <Card.Text>
                    {shop.Description}<br />{shop.PlatformLink}
                </Card.Text>
                <Button variant="light" onClick={()=>this.navigate(shop.PlatformLink)}>Manage</Button>
                <Button variant="danger" size="sm" onClick={()=>{console.log("delete not implemented yet")}}>Delete</Button>
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

    renderShop(){
        let ele = <ShopManager shopLink={this.state.page} />;
        return ele;
    }


    render() {
        return (
            <Wrap>
                {this.state.page === "main" ? this.renderWelcome() : this.renderShop()}
            </Wrap>
        )
    }
}
