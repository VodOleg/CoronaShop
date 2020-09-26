import React from 'react'
import { Redirect } from 'react-router-dom'
import SSM from './SimpleStateManager';

import SellerPage from './../Components/SellerPage/SellerPage';
class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = SSM.isLogged();
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoute;