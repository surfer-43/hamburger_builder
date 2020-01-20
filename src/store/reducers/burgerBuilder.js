import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const ingredientPrices = {
    salad: .5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}


const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            let newPrice = state.totalPrice + ingredientPrices[action.ingredientName];
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: newPrice
            }
        case actionTypes.REMOVE_INGREDIENT:
            newPrice = state.totalPrice - ingredientPrices[action.ingredientName];
            let newState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: newPrice
            }
            return newState;
        case actionTypes.MODIFY_PRICE:
            // newPrice = updatePrice(state);
            return {
                ...state,
                totalPrice: newPrice
            };
        case actionTypes.SET_INGREDIENTS:
            // newPrice = updatePrice(state);
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            // newPrice = updatePrice(state);
            return {
                ...state,
                error: true
            };
        default:
            return state
    }
}

export default reducer;