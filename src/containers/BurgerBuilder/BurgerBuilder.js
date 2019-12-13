import React, { Component } from 'react';

// custom components
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import axios from '../../axios-orders';

// add the modal overlay where we access and control state
import Modal from '../../components/UI/Modal/Modal';
import OrerSummary from '../../components/Burger/OrderSummary/OrderSummary';

// add the spinner for the loading state
import Spinner from '../../components/UI/Spinner/Spinner';

// adding the higher order component to handle any errors
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    /**
     * initial state of the application
     */
    state= {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        inCheckout: false,
        loading: false,
        error: null
    }

    componentDidMount () {

        axios.get('https://my-burger-df13e.firebaseio.com/Ingredients.json')
        .then( resp => {
            this.setState({ingredients: resp.data})
        })
        .catch(error => {
            this.setState({error: true});
        })
    }

    updatePurchaseState (ingredients) {
        // one way to see if the state should be switched
        // we are looping through all the elements in the array anyway just for a 
        // boolean flag... Array.every does the same thing and returns t/f if all 
        // elements meet the requirement

        const sum = Object.keys(ingredients)
        .map(ingredientKey => {
            return ingredients[ingredientKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        this.setState({purchasable: sum > 0});
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
        this.setState({inCheckout:true})
    }

    clearModal = () => {
        this.setState({inCheckout:false})
    }

    checkoutContinueHandler = () => {
        // alert("you want to continue!!!");

        // create url with query params for the actual burger built
        const burgerIngredient = Object.keys(this.state.ingredients);

        // burgerIngredientData = null;
        let burgerData = burgerIngredient.map( p => {
            let value = encodeURIComponent(p) + "=" + encodeURIComponent(this.state.ingredients[p].toString());
            return value;
        });
        burgerData.push("price=" + this.state.totalPrice);
        const queryString = burgerData.join("&");
        this.props.history.push({pathname: "/checkout", search: "?"+queryString});

    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        let burger = this.state.error? <p> Ingredients can't be loaded</p> : <Spinner /> 
        let orderSummary = null;

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        if(this.state.ingredients) {
            burger = (
                <Aux>
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

            orderSummary = <OrerSummary 
                checkoutCancel={this.clearModal}
                checkoutContinue={this.checkoutContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
            />
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.inCheckout}
                    modalClosed={this.clearModal}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

/**
 * the higher order component used here needs to be used with axios or some other
 * method to make http requests and handle interceptors
 */
export default withErrorHandler(BurgerBuilder, axios);