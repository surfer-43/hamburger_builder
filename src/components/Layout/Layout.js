import React from "react";

// import custom CSS classes
import classes from './Layout.css';

// import custom classes
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
    console.log("[Layout()] props: ", props);
    return (
        <Aux>
            <Toolbar />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;