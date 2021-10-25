import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Aux from '../Auxilliary/Auxilliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ({children}) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const isAuthenticated = useSelector(state => !!state.auth.token)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <Toolbar
                isAuth={isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {children}
            </main>
        </Aux>
    );
}

export default (Layout);