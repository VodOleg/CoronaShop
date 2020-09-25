import React, { Component } from 'react';
import Wrap from '../../Common/Wrap';
import BE from '../../Common/comm';
import {Form, Button} from 'react-bootstrap';
import './LandingPage.css';
import {UtilityFunctions as UF} from '../../Common/Util';
import InputWithSubmit from '../../UI/InputWithSubmit';
import SimpleStateManager from '../../Common/SimpleStateManager';

export default class LandingPage extends Component {
    constructor(props){
        super(props);
        //this.api = BE;
        //this.SSM = SimpleStateManager;
    }

    go_login(click){
        console.log(click);
    }

    onSubmitCustom(e){
        e.preventDefault();
    }

    login_square(){
        let ele = <LoginForm />;
        return ele;
    }

    renderMain(){
        let ele = <Wrap>
            <div className="headerWelcome">
                <h3>Welcome to Corona Shops</h3>
            </div>
            <div className="loginForm">
                Please Login or <span>register.</span>
                {this.login_square()}
            </div>
        </Wrap>;

        return ele;
    }
    

    render() {
        return (
            <div>    
                {this.renderMain()}     
            </div>
        )
    }
}


class LoginForm extends Component{
    constructor(props){
        super(props);
        let email = "";
        if(UF.isDefined(props.email)){
            email = props.email;
        }
        this.state={
            email:email,
            pw:""
        }
    }

    async go_login(e){
        e.preventDefault();
        let success = await BE.tryLogIn(this.state.email, this.state.pw);
        SimpleStateManager.setIsLogged(success, this.state.email);
        
    }

    emailChanged(e){
        this.setState({
            email:e.target.value
        })
    }
    pwChanged(e){
        this.setState({
            pw:e.target.value
        })
    }

    render(){
        let ele = <Wrap>
            <Form onSubmit={this.onSubmitCustom}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.emailChanged.bind(this)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.pw} onChange={this.pwChanged.bind(this)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={e=>this.go_login(e)}>
                    Submit
                </Button>
            </Form>
        </Wrap>;
        return ele;
    }
}