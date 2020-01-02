import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import classes from "./ContactData.css";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Sam'
                },
                value: ""
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street address'
                },
                value: ""
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: ""
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ""
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ""
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: "choose a delivery type"
            }
        }
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        
        const formData = {};
        for(let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            formData: formData
        }    

        // sending the order information to the database
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({
                loading: false
            });
            this.props.history.push("/");
        })
        .catch( error => {
            this.setState({
                loading: false
            });
        });
    }

    changeHandler = (event, id) => {
        console.log("data passed to the changedHandler: ", id, " : ", event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElm = {
            ...updatedOrderForm[id]
        }

        updatedFormElm.value = event.target.value;
        updatedOrderForm[id] = updatedFormElm;
        this.setState({orderForm: updatedOrderForm})
    }

    render() {
        const formElementArray = [];
        for( let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(elm => {
                        return (
                            <Input key={elm.id} elementType={elm.config.elementType} elementConfig={elm.config.elementConfig} value={elm.config.value} changed={(event) => {this.changeHandler(event, elm.id)}} />
                        )
                    })}
                    <Button 
                        btnType="Success"
                    >Order</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form} 
            </div>
        );
    }
}

export default ContactData;