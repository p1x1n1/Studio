import React from 'react';
import { Accordion } from 'react-bootstrap';

const FloristOrder = ({order}) => {
    //order = order || {number:34, idStatusOrder:2};
    const composition_orders=[{number:34 }];    
    <Accordion>
        <Accordion.Header title={order.number}>
        </Accordion.Header>
        <Accordion.Body>

        </Accordion.Body>
    </Accordion>
}
 
export default FloristOrder;