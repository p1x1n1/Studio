import React, {useContext} from 'react';
import {Route,Routes,Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
//import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {user}= useContext(Context)
    console.log(user)
    //const isAuth = false
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path,Component}) =>
                  <Route key={path} path={path} element={Component} />
            )}
             {publicRoutes.map(({path,Component}) =>
                 <Route key={path} path={path} element={Component} />
            )}
            <Route path="*" element={ <Navigate to={SHOP_ROUTE} replace={true} /> } />
        </Routes>
    );
};

export default AppRouter;