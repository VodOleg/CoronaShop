/**
 * @description this class is a singleton class that manages the state for an on
 *              going session, it will store information like if session is logged in and other stuff
 * 
 */
class SimpleStateManager{
    constructor(props){
        this.m_bIsLogged = false;
        this.email = "";
        this.developmentMode = (window.location.port === '3000')
        this.sellerData = {};
    }

    setIsLogged(user){
        console.log(user);
        this.m_bIsLogged = user.authenticated;
        if (user.authenticated)
            this.updateSeller(user.data);
    }

    updateSeller(data){
        if(data.hasOwnProperty("data")){
            this.email = data.data.Credentials.email;
            this.sellerData = data.data;
        }else{
            this.email = data.Credentials.email;
            this.sellerData = data;
        }
    }

    getUserEmail(){
        return this.email;
    }

    getUserData(){
        return this.sellerData;
    }

    isDevelopmentMode(){
        return this.developmentMode;
    }

    isLogged(){
        return this.m_bIsLogged;
    }
}

const SSM = new SimpleStateManager();
//Object.freeze(SSM);
export default SSM;