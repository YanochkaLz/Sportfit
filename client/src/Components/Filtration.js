import React from 'react'
import Accordion from 'react-bootstrap/Accordion';


const Filtration = () => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Size</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>Color</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Price</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Filtration