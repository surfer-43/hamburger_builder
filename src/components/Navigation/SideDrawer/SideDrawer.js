import React from 'react';

// import custom classes
import classes from '../SideDrawer/SideDrawer.css';
// import custom elements
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../../UI/Backdrop/Backdrop';
import BurgerLogo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const sideDrawer = (props) => {
    // conditional logic to show or hide the drawer
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.opened) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop 
                show={props.opened}
                hideModal={props.closed}
            />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <BurgerLogo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;