import testShop from './dummyShopForTests';
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

        if (this.developmentMode){
            this.email = testShop.Credentials.email;
            this.sellerData = testShop;
        }


        // if(this.developmentMode){
        //     this.email = "test@test.test";
        //     this.sellerData = {
        //         _id: "123123asdf1",
        //         Credentials: {
        //              email:"test@test.test",
        //              pw:"123"
        //         },
        //         Shops: [
        //              {
        //                 Name: "Test1 shop",
        //                 Description: "Test shop that sells nothing, but some text is musâ€¦ see how the text looks like and a test text test",
        //                 Location: "Givatayim",
        //                 ShopConfiguration: {
        //                     Delivery: true,
        //                     Hours: "14:00 - 18:00",
        //                     TakeAway: true
        //                 },
        //                 PlatformLink: "test1_ovo"
        //              }]
        //         }
        // }

    }

    setIsLogged(user){
        console.log(user);
        this.m_bIsLogged = user.authenticated;
        if (user.authenticated)
            this.updateSeller(user.data);
    }

    updateSeller(data){
        if(this.developmentMode){
            return;
        }
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

    getShop(link){
        console.log(this.sellerData);
        var result = this.sellerData.Shops.find(obj => {
            return obj.PlatformLink === link
          })
        return result;
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