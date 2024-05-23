import React from 'react';

import { observer } from 'mobx-react-lite';
import { Boquet_ROUTE } from '../utils/consts';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const UnFindInfo = observer ((props) => {  
    const navigate = useNavigate();
    return(
    <div className="center d-flex flex-column" style={{minHeight:'400px'}} >
        {

        (props.page == 'basket')?
        <>
            <h1>Корзина Пуста</h1>
            <h3>Добавьте что-нибудь в корзину</h3>
            <Button className='banner_button' width={100} variant='outlined-light' onClick={() => navigate(Boquet_ROUTE)}>Каталог</Button>
        </>
        :
        (props.page =='onebouquet')?
        <>
            <h1>Букет не найден</h1>
            <h3>Попробуйте изменить запрос</h3>
        </>
        :<></>
        }
    </div>
    );
});


export default UnFindInfo;