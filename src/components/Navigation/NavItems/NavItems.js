import React from 'react';

// custom components and styles
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = () => {
    return (
        <ul className={classes.NavItems}>
            <NavItem 
                link="/"
                exact
            >Burger Builder</NavItem>
            <NavItem 
                link="/orders"
            >Orders</NavItem>
            <NavItem 
                link="/auth"
            >Sign in</NavItem>
        </ul>
    )
}

export default navItems;