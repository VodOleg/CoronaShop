/**
 * @description this class is a singleton class that manages the state for an on
 *              going session, it will store information like if session is logged in and other stuff
 * 
 */
class SimpleStateManager{
    constructor(props){
        this.isLogged = false;
        this.email = "";
        this.developmentMode = (window.location.port === '3000')
    }

    setIsLogged(isLogged_, email){
        this.isLogged = isLogged_;
        if (isLogged_)
            this.email = email;
        else
            this.email = "";
    }

    getUserEmail(){
        return this.email;
    }

    isDevelopmentMode(){
        return this.developmentMode;
    }
}

const SSM = new SimpleStateManager();
//Object.freeze(SSM);
export default SSM;