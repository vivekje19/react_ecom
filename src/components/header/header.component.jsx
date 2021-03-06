import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import './header.styles.scss';
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../card-icon/card-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                Shop
            </Link>
            <Link className='option' to='/shop'>
                Contact
            </Link>
            {
                currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
                ) : (
                <Link className='option' to='/signin'>Sign In</Link>
                )
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
            
        }
       
    </div>
);
const mapStateToProps =  createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden: selectCartHidden
});
export default connect(mapStateToProps)(Header);