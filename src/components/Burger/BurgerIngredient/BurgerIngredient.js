import React from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

const BurgerIngredient = ({type}) => {
        switch (type) {
            case ('bread-bottom'):
                return <div className={classes.BreadBottom}></div>;
            case ('bread-top'):
                return (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
            case ('meat'):
                return <div className={classes.Meat}></div>;
            case ('cheese'):
                return <div className={classes.Cheese}></div>;
            case ('salad'):
                return <div className={classes.Salad}></div>;
            case ('bacon'):
                return <div className={classes.Bacon}></div>;
            default:
                return null;
        }
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;