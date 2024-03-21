import React, { useContext } from 'react';
import { Tab,Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {Context } from '../index';

const TABS = observer (() => {  
    const {boquet} = useContext(Context)
    return(<>
        <div className='tabs-container mt-4'>
        <div className='tab_content mt-1 mb-1'>
            <input type='radio' name='slider' id="popular"></input>
            <input type='radio' name='slider' id="season"></input>
            <nav>
                <label for="popular" class="popular" className='puple_text' checked>Популярное</label>
                <label for="season" class="season" className='puple_text'>Сезонные букеты</label>
                <div class="slider"></div>
            </nav>
            <section>
                <div class="tab_content tab_content-1">
                    
                </div>
            </section>
        </div>
    </div>
    <Tabs defaultActiveKey="popular"  id="uncontrolled-tab-example"  className="mb-3 mt-4 display-flex justife-content-center"  >
        <Tab eventKey="popular" title={<span className=' puple_text'>"Популярное"</span>}>
            <Link className='puple_text display-flex justife-content-center'>Смотреть всё</Link>
        </Tab>
        <Tab eventKey="season" title={<span className=' puple_text'>"Сезонные букеты"</span>}>
            <Link className='puple_text'>Смотреть всё</Link>
        </Tab>                  
    </Tabs>
    </>);
});


export default TABS;