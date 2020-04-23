import React from 'react';

// custom components and styles
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
    const button = props.authenticated ? (<NavItem link="/logout">Sign out</NavItem>):(<NavItem link="/auth">Sign in</NavItem>);
    return (
        <ul className={classes.NavItems}>
            <NavItem 
                link="/"
                exact
            >Burger Builder</NavItem>
            <NavItem 
                link="/orders"
            >Orders</NavItem>
            {button}
        </ul>
    )
}

export default navItems;