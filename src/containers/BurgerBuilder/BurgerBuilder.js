import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    const isAuth = useSelector((state) => !state.auth.token)
    const price = useSelector((state) => state.burgerBuilder.totalPrice)
    const ings = useSelector((state) => state.burgerBuilder.ingredients)
    const error = useSelector((state) => state.burgerBuilder.error)

    const dispatch = useDispatch();
    const onIngredientAdded = dispatch((ingName) => dispatch(actions.addIngredient(ingName)));
    const onInitIngredients = useCallback(
      () => dispatch(actions.initIngredients()),
      [dispatch]
    );
    const onIngredientRemoved = dispatch((ingName) => dispatch(actions.removeIngredient(ingName)));
    const onInitPurchase = dispatch(() => dispatch(actions.purchaseInit()))
    const onSetAuthRedirectPath = dispatch((path) => dispatch(actions.setAuthRedirectPath(path)));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const purchasedHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const updatePurchasedState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        };

        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            // sum will be the final result stored
            // Basically goes 0 + 2, 2 + 3, 5 + 8, etc
            return sum + el;
        }, 0);

        return sum > 0;
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchasedState(ings)}
                    ordered={purchasedHandler}
                    isAuth={isAuth}
                    price={price} />
            </Aux>
        );

        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}></OrderSummary>
        );
    }
    return (
        <Aux>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);