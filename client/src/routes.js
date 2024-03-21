import { ADMIN_ROUTE, Boquet_ROUTE, IndBoquet_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,SHOP_ROUTE,Basket_ROUTE } from "./utils/consts"
import AdminPage from "./page/AdminPanel";
import Shop from "./page/Shop";
import Auth from "./page/Auth";
import Reg from "./page/Reg"
import Log from "./page/Log"
import BoquetPage from "./page/BoquetPage"
import OneBoquetPage from "./page/OneBoquetPage"
import IndBoquetPage from "./page/IndBoquetPage"
import Basket from "./page/Basket"

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
        Component: <BoquetPage/>,
        
    },
    {
        path: IndBoquet_ROUTE,
        Component: <IndBoquetPage/>,
    },
    {
        path: Basket_ROUTE,
        Component: <Basket/>,
    },

]