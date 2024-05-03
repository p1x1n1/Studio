import { observer } from 'mobx-react-lite';
import {Context } from '../index';
import React, { useContext, useEffect, useState } from 'react';
import BoquetItem from "./BouquetItem";
import { ApiService } from "../http/api.service";
import { Col, Row } from 'antd';

const apiService = new ApiService()
const BouquetList = observer ((props) => {  
    const [bouquet,setBouquet] = useState([]);
    function fetchDataBouquet() {
        if (props.category)
		apiService.get('/bouquet/category/'+props.category).then(res => {
            setBouquet(res);
        })
        else 
        apiService.get('/bouquet').then(res => {
            setBouquet(res);
        })
        console.log('bouquet',bouquet,'category',props.category);
	}
    useEffect(() => {
        fetchDataBouquet();
	}, [props])
    //const {bouquet} = useContext(Context)
    return (
        <Row className="d-flex justify-content-beetwen">
            {bouquet.map(bouquet =>
                <Col flex={12} className='d-flex justify-content-between mt-3' style={{padding:'20px'}}>
                    <BoquetItem key={bouquet.arc} bouquet={bouquet}/>
                </Col>
            )}
        </Row>
    );
});

export default BouquetList;