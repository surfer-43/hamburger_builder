import React from "react";

import classes from "./Input.css";

const input = (props) => {
    console.log("what are the props: ", props);
    let inputElement = null;
    switch(props.elementType) {
        case ('input'):
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
                />;
            break;
        
        case "select":
            inputElement = (
                <div>
                    <label>{props.value}</label>
                    <select 
                        className={classes.InputElement} 
                        value={props.value}
                        onChange={props.changed}
                    >
                        {props.elementConfig.options.map(option => {
                            return (
                                <option key={option.value} value={option.value} >{option.displayValue}</option>
                            )
                        })}
                    </select>
                </div>
            )
            break;

        default:
            console.log("this input type isn't handled yet");
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
                />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.placeholder}</label>
            {inputElement}
        </div>
    )
}

export default input;