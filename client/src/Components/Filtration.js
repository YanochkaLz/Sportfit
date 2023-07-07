import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CustomButton from './Button/CustomButton';

const Filtration = ({ allItems }) => {
    const [sizes, setSizes] = useState(null);
    const [price, setPrice] = useState(null);
    const [set, setSet] = useState(new Set());
    const [currentPrices, setCurrentPrice] = useState(null);

    useEffect(() => {
        const SetSizes = new Set()
        const prices = []
        if (allItems?.length) {
            allItems.forEach(item => {
                prices.push(item.price)
                item.itemSizes.forEach(size => {
                    SetSizes.add(size)
                })
                setSizes(Array.from(SetSizes).sort())
            })
        }
        prices.sort()
        setCurrentPrice({
            from: prices[0],
            to: prices[prices.length - 1]
        })
        setPrice({
            from: prices[0],
            to: prices[prices.length - 1]
        })

    }, [allItems]);

    useEffect(() => {
        console.log(set, price)
    }, [set, price])

    const handlePickSizes = (e) => {
        if (set.has(e)) {
            set.delete(e)
        } else {
            set.add(e);
        }
        setSet(new Set(set));
    }

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Size</Accordion.Header>
                <Accordion.Body>
                    {sizes?.length && sizes.map((size, index) => {
                        return <Button active={set.has(size.toString())} onClick={e => handlePickSizes(e.target.value)} value={size} key={index}>{size}</Button>
                    }
                    )}
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>Price</Accordion.Header>
                <Accordion.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>From {currentPrices?.from && `${currentPrices?.from}$`}</InputGroup.Text>
                        <Form.Control onChange={e => setPrice(prev => ({...prev, from: parseFloat(e.target.value) }))} type='number' placeholder="Enter price from" />
                        <InputGroup.Text>To {currentPrices?.to && `${currentPrices?.to}$`}</InputGroup.Text>
                        <Form.Control onChange={e => setPrice(prev => ({...prev, to: parseFloat(e.target.value) }))} type='number' placeholder="Enter price to" />
                    </InputGroup>
                </Accordion.Body>
            </Accordion.Item>
            <CustomButton styles={{margin: '20px auto', fontFamily: 'Oswald-Regular'}} content={'Apply filtering'}></CustomButton>
        </Accordion>
    )
}

export default Filtration
