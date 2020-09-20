// this class is used for communcation with the backend
// using axios

import axios from 'axios';
import {UtilityFunctions as UF } from './Util';

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
        let body={
            'email':email,
            'pw':pw
        }
        let res;
        try{
            res = await this.send_request('Seller/Login',body);
        }catch(exc){
        }
        let retValue = false;
        if(UF.isDefined(res) && UF.isDefined(res.data.response))
            retValue = res.data.response == "True";
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
        let response = await axios.post(request,body,config);
        return response;
    }

    
}

// singleton implementation for the BE module
const BE = new BE_Comm();
Object.freeze(BE);
export default BE;
