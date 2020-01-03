import React from "react";

import classes from "./Input.css";

const input = (props) => {
    console.log("what are the props: ", props);
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;

    if(props.invalid && props.modified) {
        validationError = <span className={classes.WarningMessage}>Please enter something valid for {props.elementConfig.placeholder} </span>
    }

    if(props.invalid && props.shouldValidate && props.modified) {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType) {
        case ('input'):
            inputElement = (
                <div>
                    <input 
                        className={inputClasses.join(" ")} 
                        {...props.elementConfig} 
                        value={props.value} 
                        onChange={props.changed}
                    />
                    {validationError}
                </div>
            )
            break;
        
        case "select":
            inputElement = (
                <div>
                    <label className={classes.Label}>{props.value}</label>
                    <select 
                        className={inputClasses.join(" ")} 
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
                className={inputClasses.join(" ")} 
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