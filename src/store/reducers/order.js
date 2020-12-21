import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START:
            fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL:
            fetchOrdersFail(state, action);
        default:
            return state;
    }
};

export default reducer;