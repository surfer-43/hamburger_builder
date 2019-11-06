import React from 'react';

// custom components and styles
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
    return (
        <ul className={classes.NavItems}>
            <NavItem 
                link="/"
                active={true}
            >Burger Builder</NavItem>
            <NavItem 
                link="/"
                active={false}
            >Checkout</NavItem>
        </ul>
    )
}

export default navItems;