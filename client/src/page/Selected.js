import {React, useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import BoquetSelectedItem from '../components/BouquetSelectedItem';



const apiService = new ApiService()
const Selected = observer (() => {  
    const [bouquet,setBouquet] = useState([]);
    const {user} = useContext(Context)
    const navigate = useNavigate()
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
                <BoquetSelectedItem key={bouquet.arc} bouquet={bouquet}/>
            )}
        </Row>
    );
});

export default Selected;