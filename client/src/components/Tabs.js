import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import BoquetItem from './BouquetItem';
import { ApiService } from '../http/api.service';
import { Col, Row, Button, Image } from 'react-bootstrap';
import left from '../base_img/icons/arrow_left.png';
import right from '../base_img/icons/arrow_right.png';

const apiService = new ApiService();

const TABS = () => {  
   const [isPopular, setIsPopular] = useState(true);
   const [popular, setPopular] = useState([]);
   const [season, setSeason] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 3;

   function fetchDataBouquet() {
      apiService.get('/bouquet/season/').then(res => {
         setSeason(res);
         console.log('season',res);
      });
      apiService.get('/bouquet/popular/').then(res => {
         setPopular(res);
         console.log('popular',popular);
      });
   }

   useEffect(() => {
      fetchDataBouquet();
   }, []);

   const handleTabChange = (isPopular) => {
      setIsPopular(isPopular);
      setCurrentPage(1); // Reset to first page on tab change
   };

   const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   const handleNextPage = () => {
      const maxPage = Math.ceil((isPopular ? popular.length : season.length) / itemsPerPage);
      if (currentPage < maxPage) setCurrentPage(currentPage + 1);
   };

   const currentItems = isPopular 
      ? popular.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : season.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   return (
      <div className='tabs-container mt-4'>
         <div className='tab_content mt-1 mb-1'>
            <input 
               type='radio' 
               name='slider' 
               id="popular" 
               checked={isPopular} 
               onChange={() => handleTabChange(true)} 
            />
            <input 
               type='radio' 
               name='slider' 
               id="season" 
               checked={!isPopular} 
               onChange={() => handleTabChange(false)} 
            />
            <nav>
               <label htmlFor="popular" className='pink_text'>Популярные букеты</label>
               <label htmlFor="season" className='pink_text'>Сезонные букеты</label>
               <div className="slider"></div>
            </nav>
            <section>
               <div className="tab_content-1">
                  <div className='d-flex justify-content-center'>
                     <Row className='align-items-center'>
                        <Col md={1} className='d-flex justify-content-center'>
                           {currentPage > 1 &&
                              <Button className='pupleButton' variant='outline-light' onClick={handlePrevPage}>
                                 <Image src={left} width={45}/>
                              </Button>
                           }
                        </Col>
                        {currentItems.map(bouquet =>
                           <Col key={bouquet.arc} md={3} className='mt-3' style={{ padding: '20px' }}>
                              <BoquetItem bouquet={bouquet} fetch={fetchDataBouquet} />
                           </Col>
                        )}
                        <Col md={1} className='d-flex justify-content-center'>
                           {currentPage < Math.ceil((isPopular ? popular.length : season.length) / itemsPerPage) &&
                              <Button onClick={handleNextPage} variant='outline-light' className='pupleButton'>
                                 <Image src={right} width={45}/>
                              </Button>
                           }
                        </Col>
                     </Row>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default observer(TABS);
