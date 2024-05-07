import {React, useContext, useEffect, useState } from 'react';
import { ApiService } from '../http/api.service';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import BoquetSelectedItem from '../components/BouquetSelectedItem';
import { Row } from 'antd';



const apiService = new ApiService()
const Selected = observer (() => {  
    const [bouquet,setBouquet] = useState([]);
    const {user} = useContext(Context)
    const login = user.user.login;
    console.log('login', login);
    const cnt = 1;
    const navigate = useNavigate()

    function addBasket(arc) {
		apiService.post('/basket',{login,arc,cnt}).then(() => {
            alert('Добавлено в корзину');
            fetchDataBouquet();
		})
        .catch(err => {
            alert(err.message);
        })
	}
    function deleteSelected(arc) {
		apiService.delete('/selected/'+login+'/'+arc).then(() => {
            alert('Удаленно из избранного');  
            fetchDataBouquet();
		})
	}
    
    function fetchDataBouquet() {
		apiService.get('/selected/'+user.user.login).then(res => {
            setBouquet(res);
        })
        console.log('bouquet',bouquet);
	}
    useEffect(() => {
        console.log('bouquet',bouquet);
        fetchDataBouquet();
	}, [])
    return (
        <Row className="d-flex justify-content-beetwen">
            {bouquet.map(bouquet =>
                <BoquetSelectedItem key={bouquet.arc} bouquet={bouquet} deleteSelected={deleteSelected} addBasket={addBasket}/>
            )}
        </Row>
    );
});

export default Selected;