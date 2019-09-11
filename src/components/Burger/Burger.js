import React from 'react';

// custom CSS
import classes from './Burger.css';

// custom components
import BurgerIngredients from './Ingredients/BurgerIngredients';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            console.log("[burger.js] ingredientKey value: ", ingredientKey);
            return [...Array(props.ingredients[ingredientKey])]
                .map((_, i) => {
                    console.log("what is the BurgerIngredients indexing key: ", ingredientKey+i);
                    return <BurgerIngredients key={ingredientKey+i} type={ingredientKey}/>
                })
        })
        .reduce((arr, el) =>{
            return arr.concat(el);
        }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some goodness to your buns!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
};

export default burger;