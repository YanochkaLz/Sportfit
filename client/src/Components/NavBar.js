import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoImg from '../Assets/image/navbar/logo.svg'
import searchImg from '../Assets/image/navbar/Search.svg'
import '../Styles/Navbar.scss'
import SpinnerComponent from './SpinnerComponent';
import { getTypes } from '../API/type';
import { getItems } from '../API/items';
import { useDispatch } from 'react-redux';
import { setStoreTypes } from '../features/typesSlice';
import { Context } from '../index'
import CustomButton from './Button/CustomButton';
import { observer } from 'mobx-react-lite';
import { getBasket } from '../API/basket';
import { setOrdersState } from '../features/ordersSlice';


const NavBar = observer(() => {
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [types, setTypes] = useState(null);
    const [items, setItems] = useState(null);
    const [searchingItems, setSearchingItems] = useState(null)
    const dispatch = useDispatch();
    const [isAuth, setAuth] = useState(false);
    const { user } = useContext(Context)
    const [role, setRole] = useState(null);

    const [hasOrders, setOrders] = useState(null);

    const handleFormClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSearchItem = (name) => {
        if (!name) {
            setSearchingItems(null)
        }
        else if (items && items?.length) {
            const finder = items.filter(item => item.name.includes(name))
            if (finder?.length) setSearchingItems(finder)
            else setSearchingItems(null)
        }
    }

    const logOut = () => {
        localStorage.removeItem("jwtToken");
        user.setUser({})
        user.setIsAuth(false)
        setAuth(false);
        setRole(null)
    }

    const handleGetOrder = async (id) => {
        try {
            const response = await getBasket(+id);
            if (response) {
                setOrders(response);
                dispatch(setOrdersState(response));
            }
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        try {
            getTypes().then(data => {
                if (data) {
                    dispatch(setStoreTypes(data));
                    setTypes(data)
                }
            })
            getItems(null, null, null, true).then(data => {
                if (data) {
                    setItems(data.rows)
                }
            })
        } catch (e) {
            alert(e.response)
        }
    }, [dispatch])

    useEffect(() => {
        if (items && types) {
            setLoading(false);
        }
    }, [types, items])


    if (user?.isAuth && !isAuth) {
        setAuth(true);
        setRole(user.user.role)
        if (user.user.id) {
            handleGetOrder(user.user.id)
        }
    }

    if (loading) {
        return (
            <SpinnerComponent />
        )
    }

    return (
        <Navbar id='navbar'>
            <Container style={{ flexDirection: 'column' }}>
                <div className='nav-menu nav-upper' style={{ paddingBottom: '20px' }}>
                    <Nav.Link className='logoNavbar' href="/">
                        <img src={logoImg} alt='Logo' />
                    </Nav.Link>


                    {user._user.name && <div className='user-name' style={{ textTransform: 'capitalize', fontSize: '23px' }}>Hello, {user._user.name}!</div>}

                    <Form onClick={handleFormClick} className='input-border'>
                        <img alt='Search' src={searchImg} />
                        <input onChange={e => handleSearchItem(e.target.value)} ref={inputRef} autoComplete='off' className='inputStyling' type='text' name='search' placeholder='SEARCH ENTIRE STORE HERE' />
                        {searchingItems?.length &&
                            <ul className='popUpWindow'>
                                {
                                    searchingItems?.map(item =>
                                        <li key={item.id}>
                                            <Nav.Link href={`/item/${item.id}`} >
                                                {item.name}
                                            </Nav.Link>
                                        </li>
                                    )
                                }
                            </ul>
                        }

                    </Form>
                </div>
                <div className='nav-menu'>
                    <Nav
                        style={{ maxHeight: '100px', gap: '10px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/shop/all" >
                            Shop
                        </Nav.Link>
                        <NavDropdown title="Types" id="navbarScrollingDropdown">
                            {types && types?.map(type =>
                                <Nav.Link key={type.id} href={`/shop/${type.id}`}>
                                    {type.name}
                                </Nav.Link>
                            )}
                        </NavDropdown>
                        <Nav.Link href="/#sales" >
                            Sale
                        </Nav.Link>

                        {isAuth ?
                            <>
                                {hasOrders ?
                                    <Nav.Link href="/orders" >
                                        Orders
                                    </Nav.Link>
                                    :
                                    <Nav.Link href="/basket" >
                                        Basket
                                    </Nav.Link>
                                }


                                {role === "ADMIN" &&
                                    <Nav.Link href="/admin" >
                                        Admin
                                    </Nav.Link>
                                }
                                <CustomButton onClick={logOut} styles={{ padding: '0px 10px' }} content={'Log out'}></CustomButton>
                            </>
                            :
                            <Nav.Link href="/login" >
                                Login
                            </Nav.Link>
                        }

                    </Nav>
                </div>

            </Container>
        </Navbar>
    )
})

export default NavBar
