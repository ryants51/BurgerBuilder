import React, { memo } from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = memo(({show, modalClosed, children}) => {
    // This only updates the OrderSummary when the Modal is actually showing
    return (
        <Aux>
            <Backdrop show={show} clicked={modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                {children}
            </div>
        </Aux>
    );
});

export default Modal;