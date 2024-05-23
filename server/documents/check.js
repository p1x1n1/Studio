
module.exports = (order) => {
   console.log('check',order);

   let order_compos = '';
   // const order=o.order
   if(order.composition){
      order.composition.forEach((bouquet)=>{
         bouquet_procent = bouquet.price*(100-order.procent)/100;
         console.log('check',bouquet_procent);
         order_compos+=
         '<tr>'+
               '<td>'+bouquet.arc+'</td>'+
               '<td>'+bouquet.title+'</td>'+
               '<td>'+bouquet.cnt+'</td>'+
               '<td>'+bouquet.price+'</td>'+
               '<td>'+bouquet_procent+'</td>'+
         '</tr>'
      })
   }
   console.log('order_compos',order_compos)
return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>ЧЕК</title>
      <style>
         .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica';
         color: #555;
         }
         .margin-top {
         margin-top: 50px;
         }
         .justify-center {
         text-align: center;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .invoice-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .invoice-box table tr td:nth-child(2) {
         text-align: right;
         }
         .invoice-box table tr.top table td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
         .invoice-box table tr.information table td {
         padding-bottom: 40px;
         }
         .invoice-box table tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .invoice-box table tr.details td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.item td {
         border-bottom: 1px solid #eee;
         }
         .invoice-box table tr.item.last td {
         border-bottom: none;
         }
         .invoice-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .invoice-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         }
      </style>
   </head>
   <body>
      <div class="invoice-box">
            <h1 class="justify-center">Чек на заказ</h1>
         <table cellpadding="0" cellspacing="0">
            <tr class="top">
               <td colspan="2">
                  <table>
                    <tr>
                        <th><h3 style="color: #c45bc4;">FloristStudio</h3></th>
                     </tr>
                     <tr>
                        <td class="title">
                          <img  src="https://i.pinimg.com/736x/9a/e4/22/9ae422266d262fbc1669ab558e2fb401.jpg"
                           style="width:100%; max-width:156px;">
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td style="width: 10%;"></td>
                                    <td colspan="5">Дата создания заказа: </td>
                                    <td colspan="5">  ${order.createdAt}</td>
                                </tr>
                                <tr>
                                    <td style="width: 10%;"></td>
                                    <td colspan="5">Дата доставки заказа:</td> 
                                    <td colspan="5">${order.date_order}</td>
                                </tr>
                            </table>
                        </td>
                     </tr>
                     
                  </table>
               </td>
            </tr>
            <tr class="information">
               <td colspan="2">
                  <table>
                    <tr>
                        <th>
                            Номер заказа: 
                        </th>
                        <th>
                            Менеджер: 
                         </th>
                         <th>
                            Флорист: 
                         </th>
                         <th>
                            Курьер: 
                         </th>
                    </tr>
                        <tr>
                            <td>
                                ${order.number_order}
                            </td>
                            <td>
                                        ${order.employeeLogin}
                            </td>
                            <td>
                                        ${order.floristLogin}
                            </td>
                            <td>
                                        ${order.courierLogin}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
         </table>
         <br/>
         <table >
            <tr>
                <td style="width: 30%;">
                    <table>
                        <tr>
                           <th>
                            Адрес
                            </th>
                        </tr>
                        <tr>
                            <td >
                                Населённый пункт
                            </td>
                            <td>
                                ${order.localities_name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Улица
                            </td>
                            <td>
                                ${order.streets_name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Дом
                            </td>
                            <td>
                                ${order.house_number}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Вид доставки
                            </td>
                            <td>
                                ${order.type_order_title}
                            </td>
                        </tr>
                    </table>
                </td>
                <td style="width: 10%;">
                    <table>

                    </table>
                </td>
                <td style="width: 50%;">
                    <table>
                        <tr>
                            <th>
                                Заказчик
                            </th>
                        </tr>
                       <tr>
                        <td>
                            ${order.surname}
                        </td>
                        <td>
                            ${order.name_}
                        </td>
                        <td>
                            ${order.lastname}
                        </td>
                       </tr>
                       <tr>
                        <th>Телефон</th>
                        <td>
                            ${order.phone}
                        </td>
                       </tr>
                       <tr>
                        <th>Почта</th>
                        <td>
                            ${order.email}
                        </td>
                       </tr>
                    </table>
                </td>
            </tr>
        </table>
             </td>
            </tr>
              <h1 class="justify-center">Состав заказа:</h1>
              <br/>
              <table class="items-table">
                 <tr class="heading">
                    <th>Артикул</th>
                    <th>Букет</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Цена c персональной скидкой</th>
                 </tr>
                 ${order_compos}
            </table>
            <br/>
           
         <br />
         <h1 class="justify-center">Итоговая сумма: ${order.price} рублей </h1>
      </div>
   </body>
</html>
    `;
};