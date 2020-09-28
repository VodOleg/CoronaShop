// this class is used for communcation with the backend
// using axios

import axios from 'axios';
import {UtilityFunctions as UF } from './Util';
import SSM from './SimpleStateManager';

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
        console.log(res);
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
        
        let retValue = {
            success: false,
            desc : ""
        };
        if(UF.isDefined(res) && UF.isDefined(res.data.response))
            retValue.success = res.data.response === "True";
        return retValue;

    }

    async send_request(controller, body){
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'null'
            }
        };
        let request = this.BE_URL+'/api/'+controller;
        let response = null;
        try{
            response = await axios.post(request,body,config);
        }catch(exc){
        }
        return response;
    }

    
}

// singleton implementation for the BE module
const BE = new BE_Comm();
Object.freeze(BE);
export default BE;
