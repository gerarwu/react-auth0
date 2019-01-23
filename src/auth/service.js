import { config } from "./config";
import * as Auth0 from "auth0-js";

class Auth {    
    auth0 = new Auth0.WebAuth({
        domain: config.domian,
        clientID: config.clientId,
        redirectUri: config.redirect,
        audience: config.audience,
        responseType: "id_token token",
        scope: "openid profile email"
    });

    loginCallback = ()=> {};
    logoutCallback = ()=> {};

    userProfile = null;
    authFlag = "isLoggedIn";
    authStatus = this.isAuthenticated ? "init_with_auth_flag" : "init_no_auth_flag";
    idToken = null;
    idTokenPayload = null;
    accessToken;

    localLogin(authResult){
        console.log("locallogin", authResult);
        localStorage.setItem(this.authFlag, true);
        this.idToken = authResult.idToken;
        this.userProfile = authResult.idTokenPayload;
        this.accessToken = authResult.accessToken;
        this.loginCallback({ loggedIn: true });
    }

    localLogout(){
        console.log("locallogout");
        localStorage.removeItem(this.authFlag);
        this.userProfile = null;
        this.logoutCallback({ loggedIn: false });
    }

    getAccessToken(){
        console.log("getAccessToken")
        return this.accessToken;
    }

    login(){
        console.log("login");
        this.auth0.authorize(null, (err, authResult) => {
            console.log("Your login was successfylly =) ");
            console.log(err, authResult);
            if(err){ 
                console.log(err);
                this.localLogout();
            }
            else{
                this.localLogin(authResult);
                this.accessToken = authResult.accessToken;
            }
        });
    }

    isAuthenticated(){
        return localStorage.getItem(this.authFlag) === "true";
    }

    logout(){
        console.log("logout");
        this.localLogout();
        this.auth0.logout({
            returnTo: config.logoutUrl,
            clientId: config.clientId
        });
    }
}

const auth = new Auth();

export default auth;