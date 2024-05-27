
module.exports = (information) => {
    console.log('check',information);
    const start_date = information.start_date
    const end_date = information.end_date
    const date = information.date
    const all = information.all.sum
   let date_compos = '';
   if(date){
        date.forEach((bouquet)=>{
            date_compos+=
         '<tr>'+
               '<td>'+bouquet.title+'</td>'+
               '<td>'+bouquet.cnt+'</td>'+
               '<td>'+bouquet.one_sum+'</td>'+
               '<td>'+bouquet.all_sum+'</td>'+
         '</tr>'
      })
   }
   console.log('order_compos',date_compos)
return `
<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Отчёт о продажах за период ${start_date} - ${end_date}</title>
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
                <h1 class="justify-center">Отчёт о доставленных букетах</h1>
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
                                        <td colspan="5">Дата начала периода: </td>
                                        <td colspan="5">  ${start_date}</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 10%;"></td>
                                        <td colspan="5">Дата окончания периода:</td> 
                                        <td colspan="5">${end_date}</td>
                                    </tr>
                                </table>
                            </td>
                         </tr>
                         
                      </table>
                   </td>
                </tr>
             </table>
             <br/>
                 </td>
                </tr>
                  <br/>
                  <table class="items-table">
                     <tr class="heading">
                        <th>Букет</th>
                        <th>Количество</th>
                        <th>Средняя цена</th>
                        <th>Общая сумма</th>
                     </tr>
                     ${date_compos}
                </table>
                <br/>
             <br />
             <h1 class="justify-center">Итоговая сумма изготовленных букетов: ${all} рублей</h1>
          </div>
       </body>
    </html>
    `;
};