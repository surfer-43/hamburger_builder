import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../utility';

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
            let updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            let updatedIngredients = updateObj(state.ingredients, updatedIngredient);
            let updatedState = {
                ingredients: updatedIngredients,
                totalPrice: newPrice
            }
            return updateObj(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            let reducedPrice = state.totalPrice + ingredientPrices[action.ingredientName];
            let updatedIngredientReduced = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
            let updatedReducedIngredients = updateObj(state.ingredients, updatedIngredientReduced);
            let updatedReducedState = {
                ingredients: updatedReducedIngredients,
                totalPrice: reducedPrice
            }
            return updateObj(state, updatedReducedState)
            
        case actionTypes.MODIFY_PRICE:
            // newPrice = updatePrice(state);
            return updateObj(state, {totalPrice: newPrice})
        case actionTypes.SET_INGREDIENTS:
            // newPrice = updatePrice(state);
            return updateObj(state, {ingredients: action.ingredients, error: false, totalPrice: 4});
            
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            // newPrice = updatePrice(state);
            return updateObj(state, {error: true});
        default:
            return state
    }
}

export default reducer;