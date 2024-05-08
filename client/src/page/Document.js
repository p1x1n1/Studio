import {React, useContext } from 'react';
import CourierOrder from '../components/CourierOrder';
import FloristOrder from '../components/FloristOrder';
import AdminOrder from '../components/AdminOrder';
import { Context } from '../index';
import { ApiService } from '../http/api.service';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';

const apiService = new ApiService();
const Document = () => {
    const {user} = useContext(Context)
    const createAndDownloadPdf = () => {
        console.log(user.user.name_);
        apiService.post('/document', {name:user.user.name_,price1:4000,price2:2000,receiptId:4})
          .then(() => apiService.getFile('/document'))
          .then((res) => {
            const pdfBlob = new Blob([res], { type: 'application/pdf' });
            saveAs(pdfBlob, 'newPdf.pdf');
          })
          
      }
    return (
        <>{ (user.user.post ==='user')?
            <AdminOrder/>
            :(user.user.post ==='Администратор') ?
            <Button onClick={createAndDownloadPdf}>Получить отчёт</Button>
            : (user.user.post ==='Курьер') ?
            <CourierOrder />:
            <FloristOrder />}
        </>
    );
};


export default Document;