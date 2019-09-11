import React, { Component } from 'react';

// custom components
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls"

// add the modal overlay where we access and control state
import Modal from '../../components/UI/Modal/Modal';
import OrerSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state= {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: true,
        inCheckout: false
    }

    updatePurchaseState (ingredients) {
        // one way to see if the sstate should be switched
        // we are looping through all the elements in the array anyway just for a 
        // boolean flag... Array.every does the same thing and returns t/f if all 
        // elements meet the requirement

        // const sum = Object.keys(ingredients)
        // .map(ingredientKey => {
        //     return ingredients[ingredientKey]
        // }).reduce((sum, el) => {
        //     return sum + el
        // }, 0);

        // experiment to see if it can be shorter:
        const purchaseFlag = (Object.keys(ingredients)).every((val)=> {
            return ingredients[val] <= 0;
        });

        this.setState({purchasable: purchaseFlag});
    }

    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngredientCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if(oldIngredientCount <= 0) {
            return;
        }
        const updatedIngredientCount = oldIngredientCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngredientCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    checkoutHandler = () => {
        console.log("show the modal");
        this.setState({inCheckout:true})
    }

    checkoutCancelHandler = () => {
        console.log("should be hiding the modal now");
        this.setState({inCheckout:false})
    }

    checkoutContinueHandler = () => {
        alert("you want to continue!!!");
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            console.log("what is the disabled info value: ", key," : ", disabledInfo[key] <= 0);
            disabledInfo[key] = disabledInfo[key] <= 0 
        }


        return (
            <Aux>
                <Modal 
                    show={this.state.inCheckout}
                    hideModal={this.checkoutCancelHandler}
                >
                    <OrerSummary 
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    checkout={this.checkoutHandler}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;