import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { Context } from '../index';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import { DatePicker, message } from 'antd';
const apiService = new ApiService ();

const CourierDocumnet = (props) => {
    const {user} = useContext(Context)
    const [start_date, setStart] = useState('2024-04-20');
    const [end_date, setEnd] = useState('2024-05-29');
    const createAndDownloadPdf = () => {
      let all, data;
        apiService.get('/order/admin/sales/'+start_date+'/'+end_date+'?login='+user.user.login).then(
          (response) =>  {
            all = response;
            console.log(all);
            apiService.get('/ordercomposition/admin/sales/'+start_date+'/'+end_date+'?login='+user.user.login).then( 
              (response) =>  {
              data = response;
              console.log(data);
              apiService.post('/document/courier/delivery', {start_date:start_date,end_date:end_date,date: data,all:all})
              .then(
                props.getDocument('/document/delivery')
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
  const handleDateChangeStart = (date) => {
      const dateString = new Date(date).toLocaleDateString();
      setStart( dateString);
      // console.log(dateString,date);
  };
  const handleDateChangeEnd = (date) => {
      const dateString = new Date(date).toLocaleDateString();
      setEnd( dateString);
  };
    
    return(
      <div>
        <h3 className='d-flex justify-content-center align-items-center' style={{color:'#FE3B6D'}}>Отчёт о доставленных букетах</h3>
         <Row style={{marginLeft:'25%'}}>
            <Col md={3}>
            <DatePicker style={{width:'95%',height:'90%'}}
            format={{
            format: 'YYYY-MM-DD',
            type: 'mask',
            }}
            onChange={handleDateChangeStart}
            picker="date"
            id='startDate'
            placeholder="Выберите дату"
            />
            </Col>
            <Col md={3}>
            <DatePicker style={{width:'95%',height:'90%'}}
              format={{
              format: 'YYYY-MM-DD',
              type: 'mask',
              }}
              id='endDate'
              onChange={handleDateChangeEnd}
              picker="date"
              placeholder="Выберите дату"
            />
            </Col>
            <Col md={6}>
              <Button id='salesButton' className='greenButton' onClick={createAndDownloadPdf}>Получить отчёт</Button>
            </Col>
         </Row>
      </div>
    );
}
 
export default CourierDocumnet;