// this class is used for communcation with the backend
// using axios

import axios from 'axios';
import {UtilityFunctions as UF } from './Util';
import SSM from './SimpleStateManager';
import ItemForm from './../Components/SellerPage/ItemForm';

class BE_Comm{
    constructor(){
        this.BE_URL = window.location.origin;
        this.axios = require('axios').default;
    }

    async test(){
        let res1 = await this.send_request("SellabelItem",null);
        console.log(res1);
        let res2 = await this.send_request("SellabelItem/test",{test:{JobId:"asd"}});
        console.log(res2.data);
    }

    async tryLogIn(email,pw){
        let user = {
            authenticated:false,
            data:{}
        }
        if (SSM.isDevelopmentMode()){
            // in dev mode don't perform the rest call
            console.log("Simulated logged in user");
            user.authenticated = true;
            return user;
        }

        let body={
            'email':email,
            'pw':pw
        }
        let res = await this.send_request('Seller/Login',body);
        if(UF.isDefined(res) && UF.isDefined(res.data)){
            user.authenticated = res.data.response === "True";
            user.data = res.data.data;
        }
        

        return user;
    }

    async tryRegister(email,pw){
        if (SSM.isDevelopmentMode()){
            // in dev mode don't perform the rest call
            console.log("Simulated registered user")
            return true;
        }
        let body={
            'email':email,
            'pw':pw
        }
        let res = await this.send_request('Seller/Register',body);
        
        let user = {
            authenticated:false,
            data:{}
        }
        if(UF.isDefined(res) && UF.isDefined(res.data.response)){
            user.authenticated = res.data.response === "True";
            user.data = res.data.data;
        }
        return user;

    }

    async shopLinkIsUsed(shopLink, simulate=true){
        if (SSM.developmentMode){
            return simulate;
        }else{
            let shopis = await this.getShop(shopLink); 
            return shopis != null;
        }
    }

    async updateShop(shopLink, Seller){
        if(SSM.developmentMode)
            return true;
        let res = await this.send_request(`Seller/UpdateShop/${shopLink}`, Seller);
        return this.processResponse(res);
    }
    
    async addNewShop(details){
        let body = {
            Credentials:{
                email:SSM.getUserEmail(),
                pw:"blunk"
            },
            Shops:[details]
        }
        if(SSM.developmentMode){
            return true;
        }
        let res = await this.send_request('Seller/AddShop',body);
        return this.processResponse(res);
    }

    async deleteShop(shopID, pwConfirmation){
        // this is here for ease of debugging
        let body = {
            email:SSM.getUserEmail(),
            pw:pwConfirmation
        }
        let res = await this.send_request(`Seller/DeleteShop/${shopID}`, body);
        return this.processResponse(res);
    }

    async makeOrder(shopID, itemForm, cart){
        let data = {
            OrderDetails: itemForm,
            items : cart
        }
        let res = await this.send_request(`Public/${shopID}`,data);
        return this.processResponse(res);
    }

    processResponse(res){
        return UF.isDefined(res) && UF.isDefined(res.data.response) && res.data.response==="True";
    }

    async removeOrder(orderID, shopID){
        let body = {
            email:SSM.getUserEmail(),
            pw:SSM.getUserData().Credentials.pw
        }
        let res = await this.send_request(`Seller/RemoveOrder/${shopID}/${orderID}`, body);
        return this.processResponse(res);
    }
    
    async getShop(shopID){
        
        let res = await this.send_request(`Public/${shopID}`, null, 'get');
        
        if(UF.isDefined(res) && UF.isDefined(res.data.response) && UF.isDefined(res.data.data)){
            return res.data.data;
        }
        return null;
    }

    async send_request(controller, body, type='post'){
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'null'
            }
        };
        let request = this.BE_URL+'/api/'+controller;
        console.log(`sending request to:`,request);
        console.log(body);
        let response = null;
        try{
            if (type ==='post'){
                response = await axios.post(request,body,config);
            }else if(type ==='get'){
                response = await axios.get(request,config);
            }
        }catch(exc){
        }
        return response;
    }

    
}

// singleton implementation for the BE module
const BE = new BE_Comm();
Object.freeze(BE);
export default BE;
