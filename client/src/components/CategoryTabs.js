import React from 'react';
import { Button } from 'react-bootstrap';
import { CATEGORY_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';


const CategoryTab =  ({category}) => {  
    console.log(category);
    const navigate = useNavigate();
     return(
     <>
         <Button className='greenButton'
         onClick={()=>navigate(CATEGORY_ROUTE+'/'+category.id_record)}
         >{category.title}</Button>
     </>
     );
    };
export default CategoryTab;