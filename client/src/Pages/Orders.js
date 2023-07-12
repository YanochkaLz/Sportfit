import React from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../Components/SpinnerComponent';
import { Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import "../Styles/Orders.scss"

const Orders = () => {
    const currentOrders = useSelector(state => state.orders.order)
    console.log(currentOrders)

    if (!currentOrders) {
        return (
            <SpinnerComponent />
        )
    }

    return (
        <div className='orders'>
            <h1>Orders</h1>
            <hr></hr>
            <Container>
                <Alert style={{ fontFamily: 'Oswald-Regular', fontSize: '25px' }} variant='warning'>
                    Your order is being collected!
                </Alert>

                <ListGroup as="ol" numbered>
                    {currentOrders?.items?.length && currentOrders.items.map((item, index) =>
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{item.name}</div>
                                <p>Size: {item.size}</p>
                            </div>
                            <Badge bg="primary" pill>
                                Col: {item.count}
                            </Badge>
                        </ListGroup.Item>
                    )}
                </ListGroup>

                <div className='orders-price'>Total price: {currentOrders.totalAmount} $</div>
            </Container>
        </div>
    )
}

export default Orders
