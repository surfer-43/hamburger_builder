import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseOrderFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseOrder = (orderData, token) => {
    console.log('starting the async call to do something?');
    return dispatch => {
        dispatch(purchaseOrderStart());

        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
            console.log('what is the response.data: ', response.data);
            dispatch(purchaseOrderSuccess(response.data.name, orderData));
        })
        .catch( error => {
            dispatch(purchaseOrderFail(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error

    }
}

export const fetchOrders = (token) => {
    console.log("trying to get orders with token: ", token);
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get("/orders.json?auth="+token)
        .then( res => {
            const fetchedData = [];
            for ( let key in res.data) {
                fetchedData.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedData));
        })
        .catch( err => {
            console.log('err response message: ', err);
            dispatch(fetchOrdersFail(err));
        })
    }
}