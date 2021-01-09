import React, { Component } from 'react'
import { Card, Button, Form, Col, InputGroup, Modal, Table } from 'react-bootstrap';
import {UtilityFunctions as UF} from '../../Common/Util';
import SSM from './../../Common/SimpleStateManager';
import Wrap from './../../Common/Wrap';
import './SellerPage.css';
import SimpleMessageModal from './../SimpleMessageModal/SimpleMessageModal';
import BE from './../../Common/comm';
import ShopCreationForm from './ShopCreationForm';
import SellableItem from './../SellableItem/SellableItem';
import ItemForm from './ItemForm';
import OrderDetails from './OrderDetails';

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
        const pageRefreshInterval = 10000*6; // 1 min
        this.refresh = setInterval(()=>{
            this.updateShopView();
        }, pageRefreshInterval);
    }

    componentWillUnmount(){
        clearInterval(this.refresh);
    }
    

    removeItem(itemData){
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
        for (let i in items){
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
            case "order":
                ele = <SimpleMessageModal onClose={this.closeModals.bind(this)} >
                    <OrderDetails orderID={itemData} closeCB={this.closeModals.bind(this)}></OrderDetails>
                </SimpleMessageModal>
                break;
        }
        return <Wrap>{ele}</Wrap>;
    }

    updateShopView(preventRefresh = false){
        BE.tryLogIn(SSM.getUserEmail(), SSM.getUserData().Credentials.pw).then((user)=>{
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
                <h6>Ongoing orders:</h6>
                {this.renderActiveOrders()}
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
    
    removeItemFromList(item){
        let orderID = item.target.id.substring(item.target.id.lastIndexOf("_")+1);
        
        BE.removeOrder(orderID, this.shopLink).then(res=>{
            this.updateShopView();
        })
    }

    showOrderInModal(item){
        let orderID = item.target.id.substring(item.target.id.lastIndexOf("_")+1);
        this.popModal("order", orderID);
    }

    renderOrders(){
        let shopOrders = SSM.getShopOrders(this.shopLink);
        let items = [];
        for (let i in shopOrders){
            items.push(
                    <tr key={"orderID_"+shopOrders[i].OrderID}>
                        <td>{i}</td>
                        <td>{shopOrders[i].OrderDetails.Name}</td>
                        <td>{shopOrders[i].OrderDetails.mAddress}</td>
                        <td>{shopOrders[i].OrderDetails.mPhoneNumber}</td>
                        <td>{new Date(Date.parse(shopOrders[i].OrderTimestamp)).toString()}</td>
                        <td >
                            <Button variant={'primary'} size={'sm'} id={'showItemsButton_'+shopOrders[i].OrderID} onClick={this.showOrderInModal.bind(this)}> Open </Button>
                            <span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     </span>
                            <Button variant={'danger'} size={'sm'} id={'order_in_list_'+shopOrders[i].OrderID} onClick={this.removeItemFromList.bind(this)} >X</Button>
                        </td>
                    </tr>)
        }
        return items;
    }

    renderActiveOrders(){
        
        let ele = 
        <Wrap>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Client</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Order Time</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {this.renderOrders()}
            </tbody>
            </Table>
        </Wrap>

        return ele;
    }


    render() {
        return (
            <Wrap>
                {UF.isNonEmptyString(this.state.renderModal) ? this.setRenderModal(this.state.renderModal) : null}
                {this.renderWelcome()}
            </Wrap>
        )
    }
}
