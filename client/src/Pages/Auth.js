import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { login, registration } from '../API/user';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'

import { Context } from '../index'

import "../Styles/AuthPage.scss";
import CustomButton from '../Components/Button/CustomButton';

const Auth = () => {
    const { user } = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const history = useNavigate();
    const {
        register,
        formState: {
            errors, isValid
        },
        handleSubmit,
        reset
    } = useForm({
        mode: 'all'
    })

    const onSubmit = async (data) => {
        const { email, password, name, phone } = data;
        reset();
        try {
            let response;
            if (isLogin) {
                response = await login(email, password);
            } else {
                response = await registration(email, password, name, phone);
            }
            if (response) {
                user.setUser(response)
                user.setIsAuth(true)
                history('/')
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const AlertMessage = ({ text }) => <Alert style={{ fontSize: '16px' }} className='mt-1 mb-0 p-2 d-inline-block' variant="danger">{text}</Alert>
    const PasswordError = () => {
        return (
            <ul style={{ margin: 0, padding: 0, listStylePosition: 'inside' }}>
                <li>от 8 до 12 символов</li>
                <li>хотя бы одна цифра</li>
                <li>хотя бы один специальный символ из списка !@#$%^&*</li>
                <li>хотя бы один строчная буква</li>
            </ul>
        )
    }

    return (
        <div>
            <h1 className='auth-title'>Login</h1>
            <hr></hr>
            <Container>
                <div className='auth'>

                    <Form className='d-flex flex-column container' onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-4" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...register('email', {
                                required: 'Поле обязательно к заполнению!',
                                maxLength: {
                                    value: 50,
                                    message: 'Максимум 50 символов!'
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Поле не соответсвует формату email!'
                                }
                            })} placeholder="Enter email" />
                            {errors?.email &&
                                <AlertMessage text={errors?.email?.message || "Ошибка!"} />
                            }
                        </Form.Group>

                        {!isLogin &&
                            <>
                                <Form.Group className="mb-4" controlId="validationCustom01">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control {...register('name', {
                                        required: 'Поле обязательно к заполнению!',
                                        minLength: {
                                            value: 2,
                                            message: 'Минимум 2 символа!'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Максимум 20 символов!'
                                        },
                                        pattern: {
                                            value: /^[\p{L}\s-]+$/u,
                                            message: 'Допустимы только буквы!'
                                        }
                                    })} type="text" placeholder="Enter your name" />
                                    {errors?.name &&
                                        <AlertMessage text={errors?.name?.message || "Ошибка!"} />
                                    }
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control {...register('phone', {
                                        required: 'Поле обязательно к заполнению!',
                                        pattern: {
                                            value: /^\d+$/,
                                            message: 'Допустимы только цифры!'
                                        }
                                    })} type="number" placeholder="Enter your number" />
                                    {errors?.phone &&
                                        <AlertMessage text={errors?.phone?.message || "Ошибка!"} />
                                    }
                                </Form.Group>
                            </>

                        }

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...register('password', {
                                required: 'Поле обязательно к заполнению!',
                                minLength: {
                                    value: 8,
                                    message: 'Минимум 8 символов!'
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'Максимум 12 символов!'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,12}$/,
                                    message: <PasswordError />
                                }
                            })} type='password' placeholder="Password" />
                            {errors?.password &&
                                <AlertMessage text={errors?.password?.message || "Ошибка!"} />
                            }
                        </Form.Group>
                        <Row>
                            {isLogin ?
                                <div className='mt-3 auth-link d-flex gap-2'>
                                    Do you have an account? <NavLink to='/registration'>Registration</NavLink>
                                </div> :
                                <div className='mt-3 auth-link d-flex gap-2'>
                                    Do you have an account? <NavLink to='/login'>Login</NavLink>
                                </div>
                            }
                        </Row>
                        <Button className='mt-3' variant="primary" disabled={!isValid} type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>

    )
}

export default Auth
