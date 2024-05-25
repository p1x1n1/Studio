import {React, useContext } from 'react';
import CourierOrder from '../components/CourierOrder';
import FloristOrder from '../components/FloristOrder';
import AdminOrder from '../components/AdminOrder';
import { Context } from '../index';
import { ApiService } from '../http/api.service';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';
import AdminDocumnet from '../components/AdminDocument';
import UserOrderDocument from '../components/UserOrderDocument';

const apiService = new ApiService();
const Document = () => {
    const {user} = useContext(Context)
    function getDocument(path){
      apiService.getFile(path)
          .then((res) => {
            console.log('res',res);
            const pdfBlob = new Blob([res], { type: 'application/pdf' });
            saveAs(pdfBlob, 'Отчёт.pdf');
          })
    }
    return (
        <div style={{minHeight:'400px'}}>
            { (user.user.post ==='user')?
            <UserOrderDocument getDocument={getDocument}/>
            :(user.user.post ==='Администратор') ?
            <AdminDocumnet getDocument={getDocument}/>
            : (user.user.post ==='Курьер') ?
            <CourierOrder />:
            <FloristOrder />}
        </div>
    );
};


export default Document;