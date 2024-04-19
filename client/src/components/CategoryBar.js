import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
//import {Context} from "../index";
//import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//import { MDBCheckbox } from 'mdb-react-ui-kit';
//import { Container } from 'react-bootstrap';
import { ApiService } from '../http/api.service';

const apiService = new ApiService()
const TypeBar = observer(() => {
    //const {boquet} = useContext(Context)
    const [categories,setCategories]= useState([])
    const [selected_categories,setSelected_categories] = useState([])
    useEffect(() => {
        apiService.get('/category').then(res => {
            setCategories(res);
        })
        console.log('category',categories)
	}, [])
    return(
        /*<Container>
        { categories.map(category => 
            <MDBCheckbox 
              label={category.name}
              id={category.id}
              checked={ selected_categories.id === category.id}
              onChange={() =>  setSelected_categories(category)}
              key={category.id}
            />
          )}
          </Container>*/
    //добавить множественный выбор
  <>
        <ListGroup >
            {categories.map(category => 
            <ListGroup.Item
            style={{cursor: 'pointer'}}
            active={ selected_categories.id_record === category.id_record}//если совпадает то активно
            onClick={()=> setSelected_categories(category)} //событие клика на категорию
            key={category.id_record}>
                {category.title}
                </ListGroup.Item>)
            }
        </ListGroup>
    
  </>
    );
    
});

export default TypeBar;