import { combineReducers } from 'redux';
import sellerReducer from './sellerReducer';

export default combineReducers({
    seller: sellerReducer
});