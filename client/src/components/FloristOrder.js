import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import BoquetItemOrder from './BouquetItemOrder';
import { Modal } from 'antd';

const apiService = new ApiService ();
const FloristOrder = ({order}) => {
    order = order || {number_order:11, idStatusOrder:2};
    const [composition, setComposition] = useState([]);
    function getComposition(){
        apiService.get('/ordercomposition/'+order.number_order).then((res) => {
            setComposition(res);
            console.log(res,'composition');
        }).catch((err) => {
            console.log(err,'error');
        });
    }    
    useEffect(() =>{
        getComposition()
    }, [])
    return(
        <>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <div className='d-flex justify-content-between'>
                            <h3>Номер заказа: {order.number_order} </h3>
                            {/* <p style={{color: 'green'}}>Статус: В сборке</p> */}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <p>Состав заказа:</p>
                        {composition.map(bouquet =>
                            <BoquetItemOrder key={bouquet.arc} bouquet={bouquet}/>
                        )}
                <Button type='submit' className='pupleButton mt-3 mb-2' variant='outlined-light'  //onClick={//статус заказа изменить прямо тут }
                    > Сменить статус заказа на 'Изготовлен'</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}
 
export default FloristOrder;