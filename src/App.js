import React from "react";

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {setCurrentUser} from './redux/user/user.actions.js';
import {selectCurrentUser} from './redux/user/user.selectors';
class App extends React.Component {
  
  unsubscribeFromAuth = null;
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const {setCurrentUser} = this.props;
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({            
              id:snapShot.id,
              ...snapShot.data()            
          });
        });
      }
      setCurrentUser(userAuth);
    
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
          <Header/>
          <Switch>
            <Route exact path="/" component = {HomePage} />
            <Route exact path="/shop" component = {ShopPage} />
            <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage />)} />
            <Route exact path="/checkout" component = {CheckoutPage} />
          </Switch>
          
        
      </div>
    );
    }  
}

const mapStateToProps =  createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dishpatch  => ({
  setCurrentUser: user => dishpatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
