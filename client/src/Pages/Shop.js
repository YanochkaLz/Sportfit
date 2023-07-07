import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getItem, getItems } from '../API/items'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import homeIcon from "../Assets/image/shop/home_icon.png";
import CardItem from '../Components/CardItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import "../Styles/Shop.scss";
import Filtration from '../Components/Filtration';
import { useSelector } from 'react-redux';
const LIMIT = 6;


const Shop = () => {
  const inputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [titlePage, setTittlePage] = useState('all');
  const { id } = useParams();
  const allTypes = useSelector(state => state.types.types)

  const filtrationComponent = useMemo(() => <Filtration allItems={allItems} />, [allItems])

  const handleGetAllItems = async () => {
    try {
      const items = await getItems(id === 'all' ? null : +id, currentPage, LIMIT);
      if (items) {
        setTotalItems(items.count);
        setItems(items.rows);
      }
      const allItems = await getItems(id === 'all' ? null : +id, null, null, true);
      if (allItems) {
        setAllItems(allItems.rows);
      }

    } catch (e) {
      alert(e.response.data.message);
    }
  }


  const handleGetOneItem = async (id) => {
    const item = await getItem(id)
    console.log(item)
  }


  const handleSearchItem = async (name) => {
    setCurrentPage(1)
    if (name && allItems?.length) {
      const finder = allItems.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
      if (finder?.length) {
        setItems(finder.slice(0, LIMIT));
        setAllItems(finder);
        setTotalItems(finder.length);
      }
      else setItems(null)
    }
    else if (!name) {
      handleGetAllItems()
    }
  }

  useEffect(() => {
    if (id && allTypes?.length && id !== 'all') {
      setTittlePage(allTypes.find(type => type.id === +id).name)
    }
  }, [id, allTypes])


  useEffect(() => {
    if (inputRef.current.value) {
      setItems(allItems.slice((currentPage - 1) * LIMIT, (currentPage) * LIMIT))
    } else {
      handleGetAllItems();
    }
  }, [currentPage])


  return (
    <div className='shop'>
      <Container>
        <div className='shop-menu'>
          <div className='shop-navigation'>
            <Breadcrumb>
              <Breadcrumb.Item className='home-btn' href="/"><img src={homeIcon} alt='Home' />Home</Breadcrumb.Item>
              <Breadcrumb.Item active>{titlePage}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='shop-search'>
            <input ref={inputRef} onChange={e => handleSearchItem(e.target.value)} type='text' placeholder='SEARCH'></input>
          </div>
        </div>
      </Container>


      <div className='shop-main'>
        <Container>
          <div className='gallery'>
            <div className='sorting'>
                {filtrationComponent}
            </div>

            <div className='gallery-list'>
              {items?.length ? items.map(item =>
                <CardItem key={item.id} item={item} />
              ) : <Alert className='alert-noitems' variant='light'>
                No items found!
              </Alert>}
            </div>
          </div>

          {totalItems && items?.length && <PaginationControl
            page={currentPage}
            between={4}
            total={totalItems}
            limit={LIMIT}
            changePage={(page) => {
              setCurrentPage(page);
            }}
            ellipsis={1}
          />}
        </Container>

      </div>



    </div>
  )
}

export default Shop
