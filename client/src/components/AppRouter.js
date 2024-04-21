import React, {useContext} from 'react';
import {Route,Routes,Navigate} from 'react-router-dom'
import { publicRoutes} from "../routes";
import {Basket_ROUTE, CABINET, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import { Container } from 'react-bootstrap';
import Cabinet from '../page/Cabinet';
import Basket from '../page/Basket';
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const {user}= useContext(Context)
    console.log('user',user.user,'userIsAuth',user.isAuth)
    //const isAuth = false
    const authRoutes = [
        // {
        //     path: CABINET,
        //     Component: <Cabinet user = {user}/>,
        // },
        {
            path: Basket_ROUTE,
            Component: <Basket user = {user}/>,
        },
    ]
    return (
       <Container className='Container'>
            <Routes>
                <Route path={CABINET} element={<Cabinet  user = {user}/> } />
                {user.isAuth && authRoutes.map(({path,Component}) =>
                      <Route key={path} path={path} element={Component} />
                )} 
                {user.isAuth }
                 {publicRoutes.map(({path,Component}) =>
                     <Route key={path} path={path} element={Component} />
                )}
                
                <Route path="*" element={ <Navigate to={SHOP_ROUTE} replace={true} /> } />
            </Routes>
       </Container>
    );
});

export default AppRouter;