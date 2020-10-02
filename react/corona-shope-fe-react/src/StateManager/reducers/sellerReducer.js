import { FETCH_SELLER } from './../actions/types';

const initialState = {
    Credentials : {
        email: ""
    },
    Shops : [],
    _id: ""
}

export default function ( state = initialState, action){
    switch(action.type){
        case FETCH_SELLER:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}
