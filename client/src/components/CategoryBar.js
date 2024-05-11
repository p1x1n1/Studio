import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
//import {Context} from "../index";
//import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//import { MDBCheckbox } from 'mdb-react-ui-kit';
//import { Container } from 'react-bootstrap';
import { ApiService } from '../http/api.service';
import { Checkbox, Divider, Slider } from 'antd';

const apiService = new ApiService()
const CheckboxGroup = Checkbox.Group;


const TypeBar = observer((props) => {
    //const {boquet} = useContext(Context)
    const [categories,setCategories]= useState([])
    const [start_end,setStartEnd] = useState([1000,5000])
    const [flower,setFlower] = useState([])
    const [selected_categories,setSelected_categories] = useState([])


    const [checkedList, setCheckedList] = useState(flower);
    const checkAll = flower.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < flower.length;
    const onChange = (list) => {
        setCheckedList(list);
        props.chooseFlowers(list);
        console.log('flower',flower,'checked',checkedList)
    };
    const onCheckAllChange = (e) => {
        console.log(e.target.checked);
        (e.target.checked) ? 
        setCheckedList(flower.map((flower) => flower.value))
        : setCheckedList([]);
        props.chooseFlowers(checkedList);
        console.log('flower',flower,'checked',checkedList)
    };

    useEffect(() => {
        apiService.get('/category').then(res => {
            setCategories(res);
        })
        console.log('category',categories)
        apiService.get('/flower').then(res => {
            const flower = res.map((flower) => ({ value: flower.id_record, label: flower.title }));
            setFlower(flower);
        })
        console.log('flowers',categories)
        
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
        <h1>Цена</h1>
        <div className='d-flex flex-row'>
            <p style={{width:'10%'}}>{start_end[0]}</p>
            <Slider style={{width:'70%'}} range max={10001} min = {0} 
              onChangeComplete ={(v)=>{
                setStartEnd(v);
                props.choosePrice(v);
                }}
              defaultValue={start_end}
              //value={start_end}
              step={1}
            />
            <p style={{width:'10%'}}>{start_end[1]}</p>
        </div>
        <h1>Категории</h1>
        <ListGroup>
            {categories.map(category => 
            <ListGroup.Item 
        
            style={{cursor: 'pointer'}}
            active={ selected_categories.id_record === category.id_record}//если совпадает то активно
            onClick={()=> {setSelected_categories(category); props.chooseCategory(category.id_record)}} //событие клика на категорию
            key={category.id_record}>
                {category.title}
                </ListGroup.Item>)
            }
        </ListGroup>
        <h1>Цветы</h1>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Выбрать все
        </Checkbox>
        <Divider />
        <CheckboxGroup label="title" options={flower} value={checkedList} onChange={onChange} />
    
  </>
    );
    
});

export default TypeBar;