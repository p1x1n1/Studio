import { ADMIN_ROUTE, Boquet_ROUTE, IndBoquet_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,SHOP_ROUTE,Basket_ROUTE, REG_ORDER, CABINET, ORDER } from "./utils/consts"
import AdminPage from "./components/AdminPanel";
import Shop from "./page/Shop";
import Auth from "./page/Auth";
import Reg from "./page/Reg"
import Log from "./page/Log"
import BouquetPage from "./page/BouquetPage"
import OneBoquetPage from "./page/OneBoquetPage"
import IndBoquetPage from "./page/IndBouquetPage"
import Basket from "./page/Basket"
import RegOrderPage from "./page/RegOrderPage";
import Cabinet from "./page/Cabinet";
import OrderPage from "./page/OrderPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage/>,
        
    },
    /*
    {
        path: BASKET_ROUTE,
        Component: basket
    },*/
]
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>,
        //exact:true
    },
    {
        path: LOGIN_ROUTE,
        Component: <Log/>,
       
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Reg/>,
       
    },
    {
        path: Boquet_ROUTE+'/:id',
        Component: <OneBoquetPage/>,
        
    },
    {
        path: Boquet_ROUTE,
        Component: <BouquetPage/>,
        
    },
    {
        path: IndBoquet_ROUTE,
        Component: <IndBoquetPage/>,
    },
    {
        path: Basket_ROUTE,
        Component: <Basket/>,
    },
    {
        path: REG_ORDER,
        Component: <RegOrderPage/>,
    },
    {
        path: CABINET,
        Component: <Cabinet/>,
    },
    {
        path: ORDER,
        Component:<OrderPage/>,
    },
]