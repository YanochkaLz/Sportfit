import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoImg from '../Assets/homepage/logo.svg'
import searchImg from '../Assets/homepage/Search.svg'
import '../Styles/Navbar.scss'
import SpinnerComponent from './SpinnerComponent';
import { getTypes } from '../API/type';
import { getItems } from '../API/items';

const NavBar = () => {
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState(null);
    const [items, setItems] = useState(null);
    const [searchingItems, setSearchingItems] = useState(null)

    useEffect(() => {
        try {
            getTypes().then(data => {
                if (data) {
                    setTypes(data)
                }
            })
            getItems(null, null, null, true).then(data => {
                if (data) {
                    setItems(data.rows)
                }
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }, [])

    useEffect(() => {
        if (items && types) {
            setLoading(false);
        }
    }, [types, items])


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

    if (loading) {
        return (
            <SpinnerComponent />
        )
    }

    return (
        <Navbar id='navbar'>
            <Container>
                <Nav.Link className='logoNavbar' href="/">
                    <img src={logoImg} alt='Logo' />
                </Nav.Link>
                <Navbar.Collapse id="navbarScroll" style={{ justifyContent: 'space-between', }}>
                    <Nav
                        style={{ maxHeight: '100px', gap: '10px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/shop" >
                            Shop
                        </Nav.Link>
                        <NavDropdown title="Types" id="navbarScrollingDropdown">
                            {types && types?.map(type =>
                                <NavDropdown.Item key={type.id} href="#action3">{type.name}</NavDropdown.Item>
                            )}
                        </NavDropdown>
                        <Nav.Link href="/" >
                            Sale
                        </Nav.Link>
                    </Nav>
                    <Form onClick={handleFormClick} className='input-border'>
                        <img alt='Search' src={searchImg} />
                        <input onChange={e => handleSearchItem(e.target.value)} ref={inputRef} autoComplete='off' className='inputStyling' type='text' name='search' placeholder='SEARCH ENTIRE STORE HERE' />
                        {searchingItems?.length &&
                            <ul className='popUpWindow'>
                                {
                                    searchingItems?.map(item =>
                                        <li key={item.id}>{item.name}</li>
                                    )
                                }
                            </ul>
                        }

                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
