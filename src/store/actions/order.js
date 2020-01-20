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

export const purchaseOrder = (orderData) => {
    console.log('starting the async call to do something?');
    return dispatch => {
        dispatch(purchaseOrderStart());

        axios.post('/orders.json', orderData)
        .then(response => {
            console.log('what is the response.data: ', response.data);
            dispatch(purchaseOrderSuccess(response.data, orderData));
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