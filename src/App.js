import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import auth from './auth/service';
import Shoes from './components/Shoes';
import Wear from './components/Wear';

class App extends Component {

  constructor(props){
    super(props);

    auth.loginCallback = this.loggedIn.bind(this);
    auth.logoutCallback = this.loggedOut.bind(this);

    this.state = { loggedIn: false };
  }

  loggedIn(){
    console.log("loggedIn", true);
    this.setState({ loggedIn: true });
  }

  loggedOut(){
    this.setState({ loggedIn: false });
  }


  render() {
    console.log(this.state);
    return (
      <div>
        { this.state.loggedIn ? <Shoes /> : <Wear /> }
        { this.state.loggedIn ? 
          ( <button onClick={()=> auth.logout()} >Log Out</button> ) 
          : 
          ( <button onClick={()=> auth.login()} >Log In</button> ) 
        }
      </div>
    );
  }
}

export default App;
