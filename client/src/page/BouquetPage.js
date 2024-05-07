import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import CategoryBar from "../components/CategoryBar"
import BouquetList from '../components/BouquetList';
import { ApiService } from '../http/api.service';
// import { Col, Row } from 'react-bootstrap';
import { Col, Row } from 'antd';

const BouquetPage = () => {
    const [choosenCategory,setchoosenCategory] = useState() ;
    const [choosenFlower,setchoosenFlower] = useState([]) ;
    const [start_end,setstart_end] = useState([]);
    
    function chooseCategory (category){
        setchoosenCategory(category) ;
        // console.log(category)
    }
    function chooseFlowers (flowers){
        setchoosenFlower(flowers) ;
        // console.log(flowers)
    }
    function choosePrice(a){
        setstart_end(a) ;
    }
    

    return (
        <>
            <Container fluid className="align-items-center mt-3" >
                <Row className="mt-3">
                    <Col md = {6} > 
                    {/* style={{marginRight:'10px'}} */}
                        <CategoryBar width = {100} chooseCategory={chooseCategory} chooseFlowers={chooseFlowers} choosePrice={choosePrice}/>
                    </Col>
                    <Col md = {18}>
                        <BouquetList category={choosenCategory} flowers={choosenFlower} start_end={start_end}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
//<BoquetList/>

export default BouquetPage;