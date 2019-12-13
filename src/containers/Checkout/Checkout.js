import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount () {
        const ingredientsArray = this.props.location.search.slice(1).split("&");
        // tutorial suggested URLSearchParams() - not working for me
        // const ingredientsArray = new URLSearchParams(this.props.location.search);

        let newIngredients = {};
        let price = 0;
        if(ingredientsArray.length > 1) {
            ingredientsArray.forEach( ingredient => {
                let a = ingredient.split("=");
                if(a[0] !== "price") {
                    newIngredients[a[0]] = Number(a[1]);
                } else {
                    price = Number(a[1]);
                }
            });
            this.setState({
                ingredients: newIngredients,
                totalPrice: price
            });
        }
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    ingredients={this.state.ingredients}/>

                    <Route 
                        path={this.props.match.path + "/contact-data" } 
                        render={(props) => {
                            return (
                                <ContactData 
                                    ingredients={this.state.ingredients} 
                                    price={this.state.totalPrice} 
                                    {...props}
                                />
                            )
                        }}
                    />
            </div>
        )
    }
}

export default Checkout;