import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { useSelector } from 'react-redux';

const Checkout = ({history, match}) => {
    const purchased = useSelector((state) => state.order.purchased);
    const ings = useSelector((state) => state.burgerBuilder.ings);

    const checkoutCancelledHandler = () => {
        history.goBack();
    }

    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data');
    }
    let summary = <Redirect to="/" />
    if (ings) {
        const purchasedRedirect = purchased && <Redirect to="/" />;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={match.path + '/contact-data'}
                    component={ContactData} />
            </div>

        );
    }

    return summary;
}

export default Checkout;