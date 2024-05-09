import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Accordion, Button, Stack } from 'react-bootstrap';
import { message } from 'antd';
import BoquetItemOrder from './BouquetItemOrder';
const apiService = new ApiService ();

const UserOrderDocument = (props) => {
    const {user} = useContext(Context)
    const [orders,setOrders] = useState([])
    const [composition, setComposition] = useState([]);
    const [selectOrder,setSelectOrder] = useState({});

    const createAndDownloadPdf = () => {
        console.log(user.user.name_,selectOrder);
        apiService.post('/document/user', selectOrder)
          .then(
            props.getDocument()
        )
      }
      

      function fetchDataOrder(){
        apiService.get('/order/user/'+user.user.login)
        .then( (response) => {
            console.log(response,'response');
            const updatedOrders = response.map((order)=>
            {
                apiService.get('/ordercomposition/'+order.number_order).then((res) => {
                    setComposition(res);
                }).catch((err) => {
                    console.log(err,'error');
                });
                return {
					...order,
					composition: composition
				};
			});
			setOrders(updatedOrders);
        }) 
    }
    
    useEffect(() => {
		fetchDataOrder();

	}, [])

    const [messageApi, contextHolder] = message.useMessage();

    const success = (number_order) => {
        messageApi.open({
        type: 'success',
        content: 'Статус заказа '+number_order+' изменён на ' ,
        duration: 5,
        });
    };

    
    return(
      <>
        {orders.map((order)=>
          <>
            <Accordion className='mb-0 mt-0'>
              <Accordion.Item onClick={() => setSelectOrder(order)}>
                          <Accordion.Header>
                              <Stack direction='horizontal' gap={3} >
                                  <h5>Номер заказа: {order.number_order} </h5>
                                  <h5 style={{color: 'green'}} className="p-2 ms-auto">Статус: {order.status_order_title}</h5>
                                  {(order.statusOrderIdRecord === 7) ? <Button onClick={createAndDownloadPdf}>Получить Чек</Button>:<></>}
                              </Stack>
                          </Accordion.Header>
                          <Accordion.Body>
                              <h5>Информация о покупателе:</h5>
                                  <p>Логин: {order.userLogin} </p>
                                  <p>Почта: {order.email} Телефон: {order.phone}</p>
                                  <p>Имя: {order.name_} Фамилия: {order.surname} Отчество: {order.lastname}</p>
                              <h5>Доставка:</h5>
                                  <p>Населённый пункт: {order.localities_name} </p>
                                  <p>Улица: {order.streets_name}</p>
                                  <p>Дом: {order.house_number}</p>
                                  <p>Дата доставки: {order.date_order}</p>
                                  <p>Время доставки: {order.time_order}</p>
                                  <p>Вид доставки: {order.type_order_title}</p>
                                  <p>Анонимная доставка: {order.anonymized ? 'Да' : 'Нет'} </p>
                                  <p>Дополнительная информация об адресе: {order.adress_comment}</p>
                              <h5>Состав заказа:</h5>
                                  {composition.map(bouquet =>
                                      <BoquetItemOrder key={bouquet.arc} bouquet={bouquet}/>
                                  )}
                                  <p>Комментарий к заказу: {order.comment}</p>
                                  <p>Итоговая стоимость заказа: {order.price}</p>
                              <h5>Нзначенные сотрудники:</h5>
                                  <p>Флорист: {order.floristLogin}</p>
                                  <p>Курьер: {order.courierLogin}</p>
                            
                          </Accordion.Body>
                      </Accordion.Item>
                  </Accordion>
                  
          </>
          )}
          
      </>
    );
}
 
export default UserOrderDocument;