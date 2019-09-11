import React from 'react';

// custom imported elements
import classes from './Backdrop.css';

const backdrop = (props) => {
    return (
        props.show ?(
            <div 
                onClick={props.hideModal}
                className={classes.Backdrop}
            ></div>
        ) : null
    );
}

export default backdrop;