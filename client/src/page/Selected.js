import {React, useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import BoquetSelectedItem from '../components/BouquetSelectedItem';
import { Row, message } from 'antd';
import UnFindInfo from '../components/UnFindInfo';



const apiService = new ApiService()
const Selected = observer (() => {  
    const [bouquet,setBouquet] = useState([]);
    const {user} = useContext(Context)
    const login = user.user.login;
    const [inBasket,setInBasket] = useState(false);
    console.log('login', login);
    const cnt = 1;
    const navigate = useNavigate()

    function addBasket(arc) {
		apiService.post('/basket',{login,arc,cnt}).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Добавлено в корзину',
                duration: 5,
                });
            setInBasket(true)
		})
        .catch(err => {
            alert(err.message);
        })
	}
    function deleteSelected(arc) {
		apiService.delete('/selected/'+login+'/'+arc).then(() => {
            messageApi.open({
                type: 'error',
                content: 'Удаленно из избранного',
                duration: 5,
                });
            fetchDataBouquet();
		})
	}
    function deleteBasket(arc){
        apiService.delete('/basket/'+login+'/'+arc).then(res => {
            messageApi.open({
                type: 'error',
                content: 'Удаленно из корзины',
                duration: 5,
                });
            setInBasket(false)
        })
    }
    const [messageApi, contextHolder] = message.useMessage();
    function fetchDataBouquet() {
		apiService.get('/selected/'+user.user.login).then(res => {
            setBouquet(res);
        })
        console.log('bouquet',bouquet);
	}
    useEffect(() => {
        console.log('bouquet',bouquet);
        fetchDataBouquet();
	}, [inBasket])
    return (
        <div>
            
                {contextHolder}
                {(bouquet.length > 0) ?
                    <Row className="d-flex justify-content-beetwen">
                    {bouquet.map(bouquet =>
                        <BoquetSelectedItem key={bouquet.arc} bouquet={bouquet} deleteSelected={deleteSelected} addBasket={addBasket} deleteBasket={deleteBasket} setInBasket={setInBasket} inBasket={inBasket}/>
                    )}
                    </Row>
                    :
                    <UnFindInfo page={'selected'}></UnFindInfo>
                }
            
        </div>
    );
});

export default Selected;