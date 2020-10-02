import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route ,Switch} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import LandingPage from './Components/LandingPage/LandingPage';
import SellerPage from './Components/SellerPage/SellerPage';
import ProtectedRoute from './Common/ProtectedRoute';
//import store from './StateManager/store';

window.onbeforeunload = function(e){
  e.preventDefault();
  window.history.replaceState(null,"",window.location.origin);
}

ReactDOM.render(
<BrowserRouter forceRefresh={false} >
                <Switch>
                    <ProtectedRoute  path='/SellerPage' component={SellerPage} />
                    <Route  path={"/"}  component={LandingPage} />
                </Switch>
<App />
</BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
