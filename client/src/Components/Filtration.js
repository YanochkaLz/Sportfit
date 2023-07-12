import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CustomButton from './Button/CustomButton';
import { arraySizes } from '../Config/allSizes';

const defaultMaxPrice = Number.MAX_VALUE;

const Filtration = ({ allItems, handleApplyFiltration }) => {
    const [price, setPrice] = useState({ from: 0, to: defaultMaxPrice });
    const [set, setSet] = useState(new Set());

    const handlePickSizes = (e) => {
        const number = +e;
        if (set.has(number)) {
            set.delete(number)
        } else {
            set.add(number);
        }
        setSet(new Set(set));
    }

    const handleApplyFiltering = () => {
        if (allItems?.length) {
            let newAllItems;
            const sizes = Array.from(set);
            if (set.size && price.to === defaultMaxPrice && !price.from) {
                newAllItems = allItems.filter(item => {
                    return sizes ? item.itemSizes.some(size => sizes.includes(size)) : true;
                });
            } else if (!set.size && (price.to !== defaultMaxPrice || price.from)) {
                newAllItems = allItems.filter(item => {
                    return item.price >= price.from && item.price <= price.to;
                });
            } else if (set.size && (price.to !== defaultMaxPrice || price.from)) {
                newAllItems = allItems.filter(item => {
                    return item.price >= price.from && item.price <= price.to && (sizes ? item.itemSizes.some(size => sizes.includes(size)) : true);
                });
            } else {
                newAllItems = 'restart';
            }
            handleApplyFiltration(newAllItems)
        }
    }

    return (
        <Accordion defaultActiveKey="0">
            {allItems?.length && allItems[0].typeId !== 4 &&
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Size</Accordion.Header>
                    <Accordion.Body>
                        {arraySizes?.length && arraySizes.map((size, index) => {
                            return <Button active={set.has(size)} onClick={e => handlePickSizes(e.target.value)} value={size} key={index}>{size}</Button>
                        }
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            }


            <Accordion.Item eventKey="1">
                <Accordion.Header>Price</Accordion.Header>
                <Accordion.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>From</InputGroup.Text>
                        <Form.Control onChange={e => setPrice(prev => ({ ...prev, from: e.target.value === '' ? 0 : parseFloat(e.target.value) }))} type='number' placeholder="Enter price from" />
                        <InputGroup.Text>To</InputGroup.Text>
                        <Form.Control onChange={e => setPrice(prev => ({ ...prev, to: e.target.value === '' ? defaultMaxPrice : parseFloat(e.target.value) }))} type='number' placeholder="Enter price to" />
                    </InputGroup>
                </Accordion.Body>
            </Accordion.Item>
            <CustomButton onClick={handleApplyFiltering} styles={{ margin: '20px auto', fontFamily: 'Oswald-Regular' }} content={'Apply filtering'}></CustomButton>
        </Accordion>
    )
}

export default Filtration
