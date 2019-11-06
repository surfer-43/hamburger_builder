import React from 'react';

// custom content
import classes from './Modal.css';

import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} hideModal={props.checkoutCancel}/>
            <div
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' :'0'
                }} 
                className={classes.Modal}>
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;