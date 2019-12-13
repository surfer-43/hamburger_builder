import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "./ContactData.css";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            stree: "",
            postalCode: ""
        }
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Sam',
                address:{
                    zipCode: 67890987,
                    country: "Canada"
                },
                email: 'werty@qwerty.com'
            },
            delivery: 'fastest'
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

    render() {
        let form = (
                <form>
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="Your email" />
                    <input type="text" name="street" placeholder="Street name" />
                    <input type="text" name="postalCode" placeholder="Your Postal Code" />
                    <Button 
                        btnType="Success"
                        clicked={this.orderHandler}>Order</Button>
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