import React, { useContext, useState } from 'react'
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { login, registration } from '../API/user';

import { Context } from '../index'

const Auth = () => {
    const { user } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const history = useNavigate();

    const handdleSubmit = async (e) => {
        e.preventDefault()
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, name, phone);
            }
            if (data) {
                user.setUser(data)
                user.setIsAuth(true)
                history('/')
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Form className='d-flex flex-column container' onSubmit={e => handdleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>

            {!isLogin &&
                <>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control value={phone} onChange={e => setPhone(e.target.value)} type="number" placeholder="Enter your number" />
                    </Form.Group>
                </>

            }

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Row>
                {isLogin ?
                    <div className='d-flex gap-2'>
                        Do you have an account? <NavLink to='/registration'>Registration</NavLink>
                    </div> :
                    <div className='d-flex gap-2'>
                        Do you have an account? <NavLink to='/login'>Login</NavLink>
                    </div>
                }
            </Row>
            <Button className='mt-3' variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Auth
