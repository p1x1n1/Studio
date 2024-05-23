import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Button } from 'react-bootstrap';
import { message } from 'antd';
const apiService = new ApiService ();

const AdminDocumnet = (props) => {
    const {user} = useContext(Context)
    const [start_date, setStart] = useState('2024-04-20');
    const [end_date, setEnd] = useState('2024-05-29');
    const createAndDownloadPdf = () => {
      let all, data;
        apiService.get('/order/admin/sales/'+start_date+'/'+end_date).then(
          (response) =>  {
            all = response;
            console.log(all);
            apiService.get('/ordercomposition/admin/sales/'+start_date+'/'+end_date).then( 
              (response) =>  {
              data = response;
              console.log(data);
              apiService.post('/document/admin/sales', {start_date:start_date,end_date:end_date,date: data,all:all})
              .then(
                props.getDocument()
              )
             })
            })
      }


    const [messageApi, contextHolder] = message.useMessage();

    const success = (number_order) => {
        messageApi.open({
        type: 'success',
        content: 'Статус заказа '+number_order+' изменён на ' ,
        duration: 5,
        });
    };

    
    return(

        <Button className='greenButton' onClick={createAndDownloadPdf}>Получить отчёт</Button>
    );
}
 
export default AdminDocumnet;