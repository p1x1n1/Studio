import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import React, { useContext, useEffect, useState } from 'react';
import BoquetItem from "./BouquetItem";
import { ApiService } from "../http/api.service";
import { Col, Row } from 'react-bootstrap';
import { Pagination } from 'antd';

const apiService = new ApiService();

const BouquetList = observer((props) => {
    const [bouquet, setBouquet] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBouquets, setTotalBouquets] = useState(0);
    const bouquetsPerPage = 15;

    function fetchDataBouquet(page = 1) {
        const offset = (page - 1) * bouquetsPerPage;
        if (props.category || props.flowers.length !== 0 || props.start_end.length !== 0) {
            const flowers = (props.flowers.length !== 0) ? props.flowers : undefined;
            const start_end = (props.start_end.length !== 0) ? props.start_end : undefined;
            apiService.get(`/bouquet/category/${props.category}/${flowers}/${start_end}?offset=${offset}&limit=${bouquetsPerPage}`).then(res => {
                setBouquet(res.data);
                setTotalBouquets(res.total); 
            });
        } else {
            apiService.get(`/bouquet?offset=${offset}&limit=${bouquetsPerPage}`).then(res => {
                setBouquet(res.bouquets);
                console.log(res.bouquets);
                setTotalBouquets(res.total); 
            });
        }
    }

    useEffect(() => {
        fetchDataBouquet(currentPage);
    }, [props, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Row className="">
                {bouquet.map(bouquet =>
                    <Col md={4} className='mt-3' style={{ padding: '20px' }} key={bouquet.arc}>
                        <BoquetItem bouquet={bouquet} fetch={fetchDataBouquet} />
                    </Col>
                )}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={bouquetsPerPage}
                total={totalBouquets}
                onChange={handlePageChange}
                style={{ textAlign: 'center', marginTop: '20px' }}
            />
        </>
    );
});

export default BouquetList;
