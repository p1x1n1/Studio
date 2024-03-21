import { observer } from 'mobx-react-lite';
import {Context } from '../index';
import React, { useContext } from 'react';
import {Row} from "react-bootstrap";
import BoquetItem from "./BoquetItem";

const BoquetList = observer (() => {  
    const {boquet} = useContext(Context)
    return (
        <Row className="d-flex justify-content-beetwen">
            {boquet.boquets.map(boquet =>
                <BoquetItem key={boquet.id_bouquet} boquet={boquet}/>
            )}
        </Row>
    );
});

export default BoquetList;