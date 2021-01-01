import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup, Modal } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from './../SimpleMessageModal/SimpleMessageModal';
import BE from './../../Common/comm';
import ShopCreationForm from './ShopCreationForm';
import SellableItem from './../SellableItem/SellableItem';
import ItemForm from './ItemForm';

export default class ShopPage extends Component {
    constructor(props){
        super(props);
        this.shopLink = props.shopLink;
        this.shopData = SSM.getShop(props.shopLink);//props.shopData;
        
        this.backToManagerCB = props.backToManagerCB;
        this.state = {
            renderModal: "",
            modalData : null
        }

    }
    

    removeItem(itemData){
        console.log("removing item ",itemData);
        for (let i in this.shopData.Items){
            if (this.shopData.Items[i].Id == itemData.Id){
                this.shopData.Items.splice(i, 1);
                break;
            }
        }
        let updatedSeller = SSM.getUserData();
        
        BE.updateShop(this.shopLink ,updatedSeller).then(()=>{
            this.forceUpdate();
        });
    }

    editItem(itemData){
        this.popModal("existingItem", itemData)
    }

    renderItems(){
        let itemCards = [];
        let items = SSM.getShop(this.shopLink).Items;//this.shopData.Items; 
        console.log("printing item names in shop from ssm:");
        for (let i in items){
            console.log(items[i].Name);
            itemCards.push( <SellableItem key={"shop_"+this.shopLink+"_itemID_"+items[i].Id} isOwner={true} data={items[i]} editCB={this.editItem.bind(this)} removeCB={this.removeItem.bind(this)} />);
        }
        itemCards.push(this.renderAddItemAction());
        return <Wrap> {itemCards} </Wrap>;
    }

    renderAddItemAction(){
        let ele = <div className="addShopDiv" key="newItem">
            <h6 style={{textAlign:"center"}}>Add new item</h6>
            <div className="addShopDivInner" id="newItem" onClick={()=>this.popModal("newItem")}>
                <h1>+</h1>
            </div>
        </div>
        return ele;
    }

    popModal(mode, itemData = null){
        //show modal
        this.setState({
            renderModal:mode,
            modalData:itemData
        })
    }

    closeModals(){
        this.setState({renderModal:""})
    }

    itemChanged(item){
        // get current data
        let found = false;
        if (!UF.isDefined(this.shopData.Items)){
            console.log("this shop data not defined, resetting");
            this.shopData.Items = [];
        }
        for (let i in this.shopData.Items){
            if (this.shopData.Items[i].Id == item.Id){
                this.shopData.Items[i] = {...item};
                found = true;
                break;
            }
        }
        if (!found){
            console.log("item id not found, adding new item");
            this.shopData.Items.push(item);
        }
        let updatedSeller = SSM.getUserData();
        
        BE.updateShop(this.shopLink ,updatedSeller).then((ret)=>{
            this.updateShopView();
        });

    }

    setRenderModal(modalName){
        let ele ;
        let itemData = this.state.modalData;
        switch(modalName){
            case "newItem":
                ele = <SimpleMessageModal onClose={this.closeModals.bind(this)} >
                    <ItemForm backToManagerCB={this.closeModals.bind(this)} submitCB={this.itemChanged.bind(this)}/>
                </SimpleMessageModal>
                break;
            case "existingItem":
                ele = <SimpleMessageModal onClose={this.closeModals.bind(this)} >
                    <ItemForm backToManagerCB={this.closeModals.bind(this)} data={itemData} submitCB={this.itemChanged.bind(this)}/>
                </SimpleMessageModal>
                break;
        }
        return <Wrap>{ele}</Wrap>;
    }

    updateShopView(preventRefresh = false){
        BE.tryLogIn(SSM.getUserEmail(), SSM.getUserData().Credentials.pw).then((user)=>{
            console.log(user);
            if (user.hasOwnProperty('data'))
                SSM.updateSeller(user.data);
            else
                console.error("corrupted data on reload")
            if (!preventRefresh)
                this.setState({updateHolder:this.state.updateHolder+1})
        });
    }

    renderWelcome(){
        let ele = <Wrap>
            <div className="sellerheader">
                <h2>Let's Work on Your Shop!</h2>
            </div>
            <div className="bodyDiv">
                <div className="bodyControls">
                <Button type="button" variant="secondary" onClick={()=>this.backToManagerCB()}>Back</Button>

                </div>
                <div className="bodyTitle">
                    this is your main page, here you can add and managed your Items in shop. <span onClick={()=>{this.updateShopView()}} style={{color:"blue", cursor:"pointer"}}>Refresh</span>
                </div>
                <div className="bodyContent">
                    {this.renderItems()}
                </div>
            </div>
        </Wrap>
        return ele;
    }

    render() {
        console.log("rendering shop data:");
        console.log(JSON.stringify(this.shopData));
        return (
            <Wrap>
                {UF.isNonEmptyString(this.state.renderModal) ? this.setRenderModal(this.state.renderModal) : null}
                {this.renderWelcome()}
            </Wrap>
        )
    }
}
