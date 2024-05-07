import { observer } from 'mobx-react-lite';
import {Context } from '../index';
import React, { useContext, useEffect, useState } from 'react';
import BoquetItem from "./BouquetItem";
import { ApiService } from "../http/api.service";
import { Col, Row } from 'react-bootstrap';
// import { Col, Row } from 'antd';

const apiService = new ApiService()
const BouquetList = observer ((props) => {  
    const [bouquet,setBouquet] = useState([]);
    function fetchDataBouquet() {
        if (props.category || props.flowers.length !== 0 || props.start_end.length !==0 ){
            const flowers = (props.flowers.length !== 0)? props.flowers : undefined;
            const start_end = (props.start_end.length !== 0)? props.start_end : undefined;
            // console.log('flowers',flowers);
            apiService.get('/bouquet/category/'+props.category+'/'+flowers+'/'+start_end).then(res => {
                setBouquet(res);
            })
        }
        else 
        apiService.get('/bouquet').then(res => {
            setBouquet(res);
        })
        // console.log('bouquet',bouquet,'category',props.category,props.flowers);
	}
    useEffect(() => {
        fetchDataBouquet();
	}, [props])
    //const {bouquet} = useContext(Context)
    return (
        <Row className="">
            {bouquet.map(bouquet =>
                <Col md={4} className='mt-3' style={{padding:'20px'}}>
                    <BoquetItem key={bouquet.arc} bouquet={bouquet} fetch={fetchDataBouquet}/>
                </Col>
            )}
        </Row>
    );
});

export default BouquetList;