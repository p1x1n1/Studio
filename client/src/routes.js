import { ADMIN_ROUTE, Boquet_ROUTE, IndBoquet_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,SHOP_ROUTE,Basket_ROUTE, REG_ORDER, CABINET, ORDER, INVENTORY, USER, SELECTED, DOCUMENT, CATEGORY_ROUTE } from "./utils/consts"
import AdminPage from "./components/AdminPanel";
import Shop from "./page/Shop";
import Auth from "./page/Auth";
import Reg from "./page/Reg"
import Log from "./page/Log"
import BouquetPage from "./page/BouquetPage"
import OneBouquetPage from "./page/OneBouquetPage"
import IndBoquetPage from "./page/IndBouquetPage"
import Basket from "./page/Basket"
import RegOrderPage from "./page/RegOrderPage";
import Cabinet from "./page/Cabinet";
import OrderPage from "./page/OrderPage";
import Inventory from "./page/Inventory";
import Users from "./page/Users";
import Selected from "./page/Selected";
import Document from "./page/Document";
import Delivery from "./page/Delivery";
import Contacts from "./page/Contact";

 
export const authRoutes = [
    {
        path: CABINET,
        Component: <Cabinet />,
    },
    {
        path: Basket_ROUTE+'/:login',
        Component: <Basket />
    },
    {
        path: SELECTED+'/:login',
        Component: <Selected/>
    },
    {
        path: ORDER,
        Component:<OrderPage/>,
    },
    {
        path: REG_ORDER+'/:login',
        Component: <RegOrderPage/>,
    },
    {
        path: INVENTORY,
        Component: <Inventory/>,
    },
    {
        path: DOCUMENT,
        Component: <Document/>,
    },
    {
        path: USER,
        Component: <Users/>,
    },
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
        path: Boquet_ROUTE+'/:arc',
        Component: <OneBouquetPage/>,
        //exact:true
        //render: (props) => <OneBouquetPage {...props} />,
    },
    {
        path: CATEGORY_ROUTE+'/:id',
        Component: <BouquetPage/>,
        //exact:true
        //render: (props) => <OneBouquetPage {...props} />,
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
        path: '/delivery',
        Component: <Delivery/>,
    },
    {
        path: '/contact',
        Component: <Contacts/>,
    }

]