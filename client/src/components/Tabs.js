import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {Context } from '../index';
import BoquetItem from './BouquetItem';
import { ApiService } from '../http/api.service';
import { Col, Row } from 'react-bootstrap';

const apiService = new ApiService()
const TABS = () => {  
   // const {boquet} = useContext(Context)
   const [isPopular,setIsPopular] = useState([{}]);
   const [popular,setPopular] = useState([{}]);
   const [season,setSeason] = useState([{}]);
   function fetchDataBouquet() {
    apiService.get('/bouquet/season/').then(res => {
        setSeason(res);
        console.log(JSON.stringify(res));
    })
    apiService.get('/bouquet/popular/').then(res => {
        setPopular(res);
        console.log(JSON.stringify(res));
    })
   }
   useEffect(() =>{
    fetchDataBouquet();
    },[])
    return(<>
        <div className='tabs-container mt-4'>
        <div className='tab_content mt-1 mb-1'>
            <input type='radio' name='slider' id="popular"></input>
            <input type='radio' name='slider' id="season"></input>
            <nav>
                <label for="popular" class="popular" className='pink_text' checked>Популярные букеты </label>
                <label for="season" class="season" className='pink_text'>Сезонные букеты</label>
                <div class="slider"></div>
            </nav>
            <section>
                <div class="tab_content tab_content-1">
                <div className='d-flex justify-content-center'>
                 {popular ? <Row>
                        {popular.map(bouquet =>
                        <Col md={4} className='mt-3' style={{padding:'20px'}}>
                            <BoquetItem key={bouquet.arc} bouquet={bouquet} fetch={fetchDataBouquet}></BoquetItem>
                        </Col>
                        )}
                  </Row>
                  :<></>}
                </div>
                </div>
            </section>
        </div>
    </div>
    {/* <Tabs defaultActiveKey="popular"  id="uncontrolled-tab-example"  className="mb-3 mt-4 display-flex justife-content-center"  >
        <Tab eventKey="popular" title={<span className=' puple_text'>"Популярное"</span>}>
            <Link className='puple_text display-flex justife-content-center'>Смотреть всё</Link>
        </Tab>
        <Tab eventKey="season" title={<span className=' puple_text'>"Сезонные букеты"</span>}>
            <Link className='puple_text'>Смотреть всё</Link>
        </Tab>                  
    </Tabs> */}
    </>);
};


export default TABS;