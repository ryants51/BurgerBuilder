import React from 'react';
import classes from './Order.css';

const order = ({ingredients: ings, price}) => {
    const ingredients = [];

    for(let ingredientName in ings) {
        ingredients.push({
            name: ingredientName,
            amount: ings[ingredientName]
        });
    }

    let ingredientOutput = ingredients.map((ig) => {
        return (
            <span 
                style={{
                    textTransform: 'capitalize', 
                    display: 'inline',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ig.name}>{ig.name} ({ig.amount})</span>
        );
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;