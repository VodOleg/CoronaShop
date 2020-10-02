import React, { Component } from 'react';
import Wrap from '../../Common/Wrap';
import BE from '../../Common/comm';
import {Form, Button} from 'react-bootstrap';
import './LandingPage.css';
import {UtilityFunctions as UF} from '../../Common/Util';
import InputWithSubmit from '../../UI/InputWithSubmit';
import SimpleStateManager from '../../Common/SimpleStateManager';
import SellerPage from './../SellerPage/SellerPage';
import SSM from './../../Common/SimpleStateManager';
import { Redirect } from 'react-router-dom';

export default class LandingPage extends Component {
    constructor(props){
        super(props);
        
        //this.api = BE;
        //this.SSM = SimpleStateManager;
    }

    onSubmitCustom(e){
        e.preventDefault();
    }

    login_square(){
        let ele = <LoginForm />;
        return ele;
    }

    renderSellerPage(){
        let ele = <SellerPage />
        return ele;
    }
    
    

    render() {
        let rendering = <Wrap>
            {!SimpleStateManager.isLogged() ?
            this.login_square() :
            this.renderSellerPage()
            }
        </Wrap>;

        return (rendering);
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
            pw:"",
            rpw:"",
            repeatedIsCorrect : false,
            renderingLoginForm:true
        }
    }

    async go_login(e){
        e.preventDefault();
        if (this.state.renderingLoginForm){
            let user = await BE.tryLogIn(this.state.email, this.state.pw);
            if (!user.authenticated)
                alert("Credentials incorrect or email not registered");
            SimpleStateManager.setIsLogged(user);
        }else {
            if ( this.state.repeatedIsCorrect ){
                let response = await BE.tryRegister(this.state.email, this.state.pw);
                if (response.success){
                    SimpleStateManager.setIsLogged(response.success,this.state.email);
                }else{
                    alert("Cant Register this email.");
                }
            }else{
                alert("incorrect repeated password");
                this.resetPW();
            }
        }
        this.forceUpdate();
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

    repeatPwChanged(e){
        this.setState({
            rpw:e.target.value,
            repeatedIsCorrect: e.target.value === this.state.pw
        })
    }

    renderMain(){
        let ele = <Wrap>
            <div className="loginForm">
                <div className="headerWelcome">
                    <h3>Welcome to Corona Shops</h3>
                </div>
                <div >
                    Please <span type="button" onClick={()=>{this.setState({renderingLoginForm:true})}} className={this.state.renderingLoginForm ? `custom-href-link` : ``}>login</span>
                    &nbsp;or <span type="button" onClick={()=>{this.setState({renderingLoginForm:false})}} className={!this.state.renderingLoginForm ? `custom-href-link` : ``}>register.</span>
                    {this.renderLoginDiv(!this.state.renderingLoginForm)}
                </div>
            </div>
        </Wrap>;

        return ele;
    }

    resetPW(){
        this.setState({pw:"",rpw:""});
    }

    renderLoginDiv(isRegister){
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
                    {
                        isRegister ? 
                <Form.Group controlId="formBasicPasswordRepeat">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.rpw} onChange={this.repeatPwChanged.bind(this)} />
                </Form.Group>
                    :
                    null
                    }
                <Button variant="primary" type="button" onClick={e=>this.go_login(e)}>
                    Submit
                </Button> 
            </Form>
        </Wrap>;
        return ele;
    }

    redirectToSellerPage(){
        return <Redirect to={{ pathname: '/SellerPage' }} />;
    }

    render(){
        console.log("rendering landing page: islogged = " + SSM.isLogged())
        let rendering = <Wrap>
            {!SSM.isLogged() ? this.renderMain() : this.redirectToSellerPage()}
        </Wrap>;

        return rendering;
    }
}