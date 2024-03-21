import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from "../index";
//import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap';


const TypeBar = observer(() => {
    const {boquet} = useContext(Context)
    return(
        /*<Container>
        {boquet.categories.map(category => 
            <MDBCheckbox 
              label={category.name}
              id={category.id}
              checked={boquet.selected_categories.id === category.id}
              onChange={() => boquet.setSelected_categories(category)}
              key={category.id}
            />
          )}
          </Container>*/
    //добавить множественный выбор
    <ListGroup >
        {boquet.categories.map(category => 
        <ListGroup.Item
        style={{cursor: 'pointer'}}
        active={boquet.selected_categories.id === category.id}//если совпадает то активно
        onClick={()=>boquet.setSelected_categories(category)} //событие клика на категорию
        key={category.id}>
            {category.name}
            </ListGroup.Item>)
        }
    </ListGroup>

    );
    
});

export default TypeBar;