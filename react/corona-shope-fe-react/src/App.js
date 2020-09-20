import React, { Component } from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import BE from './Common/comm';
import './App.css';
import SimpleStateManager from './Common/SimpleStateManager';

class App extends Component {

  componentDidMount(){
    document.title = "Corona Shop";
  }

  render() {
    return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
      <LandingPage />
    </div>
    )
  
}
    
}

export default App;
