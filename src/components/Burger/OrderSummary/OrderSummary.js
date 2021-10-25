import React from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ingredients, price, purchaseCancelled, purchaseContinued}) => {
    // This could be a functional component and propbably should be
    return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {Object.keys(ingredients).map((igKey) => {
                        return (
                            <li key={igKey}>
                                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}
                            </li>
                        )
                    })}
                </ul>
                <p>Continue to checkout?</p>
                <p><strong>Total price: {price.toFixed(2)}</strong></p>
                <Button
                    btnType={'Danger'}
                    clicked={purchaseCancelled}>Cancel</Button>
                <Button
                    btnType={'Success'}
                    clicked={purchaseContinued}>Continue</Button>
            </Aux>
        );
}

export default OrderSummary;