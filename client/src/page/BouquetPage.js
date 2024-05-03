import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import CategoryBar from "../components/CategoryBar"
import BouquetList from '../components/BouquetList';
import { ApiService } from '../http/api.service';
import { Col, Row } from 'antd';

const BouquetPage = () => {
    const [choosenCategory,setchoosenCategory] = useState() ;
    const [choosenFlower,setchoosenFlower] = useState() ;
    
    
    function chooseCategory (category){
        setchoosenCategory(category) ;
        console.log(category)
    }
    function chooseFlowers (flowers){
        setchoosenFlower(flowers) ;
        console.log(flowers)
    }
    

    return (
        <>
            <Container className="d-flex justify-content-between align-items-center mt-3" >
                <Row className="mt-3">
                    <Col flex = {6} > 
                    {/* style={{marginRight:'10px'}} */}
                        <CategoryBar width = {100} chooseCategory={chooseCategory} chooseFlowers={chooseFlowers}/>
                    </Col>
                    <Col flex = {18}>
                        <BouquetList category={choosenCategory} flowers={choosenFlower}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
//<BoquetList/>

export default BouquetPage;