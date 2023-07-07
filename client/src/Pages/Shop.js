import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getItem, getItems } from '../API/items'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import homeIcon from "../Assets/image/shop/home_icon.png";
import CardItem from '../Components/CardItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import "../Styles/Shop.scss";
const LIMIT = 12;

const Shop = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  const handleGetAllItems = async () => {
    try {
      const items = await getItems(null, currentPage, LIMIT);
      if (items) {
        setTotalItems(items.count);
        setItems(items.rows);
      }

    } catch (e) {
      alert(e.response.data.message);
    }
  }

  const handleGetOneItem = async (id) => {
    const item = await getItem(id)
    console.log(item)
  }

  useEffect(() => {
    handleGetAllItems();
  }, [currentPage])

  useEffect(() => {
    handleGetAllItems()
  }, [])


  return (
    <div className='shop'>
      <Container>
        <div className='shop-menu'>
          <div className='shop-navigation'>
            <Breadcrumb>
              <Breadcrumb.Item className='home-btn' href="/"><img src={homeIcon} alt='Home' />Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Shorts</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='shop-search'>
            <input type='text' placeholder='SEARCH'></input>
          </div>
        </div>
      </Container>


      <div className='shop-main'>
        <Container>
          <div className='gallery'>
            <div className='sorting'>Sorting</div>
            <div className='gallery-list'>
              {items.length && items.map(item =>
                <CardItem key={item.id} item={item} />
              )}
            </div>
          </div>
          {totalItems && items && <PaginationControl
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
