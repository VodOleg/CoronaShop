import { FETCH_SELLER } from './types';
import BE from './../../Common/comm';


export function fetchSeller(){
    return function(dispatch){
        let data = {
            Credentials:{
                email:"test@email"
            },
            Shops:[
                {name:"test shop"},
                {name:"test1 shop"}
            ],
            _id:"a112312"
        }
        dispatch({
            type: FETCH_SELLER,
            payload: data
        })
    }
}
