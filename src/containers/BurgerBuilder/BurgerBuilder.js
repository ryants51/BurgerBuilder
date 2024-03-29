import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const burgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    // useSelector and useDispatch are the hooks way to do mapStateToProps and mapDispatchToProps
    const ings = useSelector((state) => state.burgerBuilder.ingredients);
    const price = useSelector((state) => state.burgerBuilder.totalPrice);
    const error = useSelector((state) => state.burgerBuilder.error);
    const isAuth = useSelector((state) => state.auth.token !== null);

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]
    ); // If not wrapped in useCallback, it would loop infinitely
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

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
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
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

export default withErrorHandler(burgerBuilder, axios);