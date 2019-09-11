import React from 'react';

// import custom stuff
import classes from './Toolbar.css';

import BurgerLogo from '../../../components/Logo/Logo';

const toolbar = (props) => {
    return( 
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <BurgerLogo />
            <nav>
                
            </nav>
        </header>
    )
}

export default toolbar;