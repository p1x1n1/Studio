import { observer } from 'mobx-react-lite';
import {Context } from '../index';
import React, { useContext, useEffect, useState } from 'react';
import {Row} from "react-bootstrap";
import BoquetItem from "./BouquetItem";
import { ApiService } from "../http/api.service";

const apiService = new ApiService()
const BouquetList = observer (() => {  
    const [bouquet,setBouquet] = useState([]);
    function fetchDataBouquet() {
		apiService.get('/bouquet').then(res => {
            setBouquet(res);
        })
        console.log('bouquet',bouquet);
	}
    useEffect(() => {
        console.log('bouquet',bouquet);
        fetchDataBouquet();
	}, [])
    //const {bouquet} = useContext(Context)
    console.log(bouquet)
    return (
        <Row className="d-flex justify-content-beetwen">
            {bouquet.map(bouquet =>
                <BoquetItem key={bouquet.arc} bouquet={bouquet}/>
            )}
        </Row>
    );
});

export default BouquetList;