import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
// import * as actions from "../../store/actions/order";

class Checkout extends Component {

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to="/"/>;
        if(this.props.ings) {
            console.log("[checkout] - there are ingredients here");
            summary = (
                <div>
                    <CheckoutSummary 
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        ingredients={this.props.ings}/>
                    <Route 
                        path={this.props.match.path + "/contact-data" } 
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onInitPurchase: () => dispatch( actions.purchaseInit() )
//     };
// }

export default connect(mapStateToProps)(Checkout);