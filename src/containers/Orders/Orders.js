import React, { Component } from "react";
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
//  import classes from './Orders.css';

class Orders extends Component {

    componentDidMount() {
        console.log("Orders.js componentDidMount is questionable: ", this.props);
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = this.props.orders.map( order => {
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                });
                
        }
    
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.suth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));