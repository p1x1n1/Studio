import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Button } from 'react-bootstrap';
import { message } from 'antd';
const apiService = new ApiService ();

const AdminDocumnet = (props) => {
    const {user} = useContext(Context)
    const createAndDownloadPdf = () => {
        console.log(user.user.name_);
        apiService.post('/document', {name:user.user.name_,price1:4000,price2:2000,receiptId:4})
          .then(
            props.getDocument()
        )
      }
    

    function fetchDataOrder(){
        
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
        <Button onClick={createAndDownloadPdf}>Получить отчёт</Button>
    );
}
 
export default AdminDocumnet;