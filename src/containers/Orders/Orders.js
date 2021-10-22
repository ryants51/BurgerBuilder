import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const orders = useSelector((state) => state.order.orders);
    const loading = useSelector((state) => state.order.loading);
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);

    const dispatch = useDispatch();
    const dispatchFetchOrders = () =>
      dispatch(actions.fetchOrders(token, userId));

    useEffect(() => {
      // Dispatches a fetchOrders action which is intercepted by the saga before getting to the reducer
      dispatchFetchOrders();
    }, []);

    return (
        <div>
            {loading ? orders.map(({id, ingredients, price}) => (
                <Order
                    key={id}
                    ingredients={ingredients}
                    price={price} />
            )) : <Spinner /> }
        </div>
        
    );
}

export default (withErrorHandler(Orders, axios));