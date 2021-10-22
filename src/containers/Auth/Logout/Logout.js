import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const logout = (props) => {
    const dispatch = useDispatch();
    const dispatchLogout = () => dispatch(actions.logout());
    useEffect(() => {
      dispatchLogout();
    }, [dispatchLogout]);
    return <Redirect to='/' />;
}

export default logout;