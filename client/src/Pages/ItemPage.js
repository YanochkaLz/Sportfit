import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getItem } from '../API/items'
import "../Styles/Item.scss"
import SpinnerComponent from '../Components/SpinnerComponent';
import { Button, Container } from 'react-bootstrap';
import { apiUrl } from '../Config/serverAPI';
import { StarsGroup } from '../Components/CardItem';
import CustomButton from '../Components/Button/CustomButton';
import bagImg from "../Assets/image/shop/Bag.svg"
import facebookImg from "../Assets/image/shop/facebook.png"
import twitterImg from "../Assets/image/shop/twitter.png"
import pinterestImg from "../Assets/image/shop/pinterest.png"
import linkImg from "../Assets/image/shop/link.png"
import carImg from "../Assets/image/shop/car.svg"
import boxImg from "../Assets/image/shop/box.svg"

const ContentButton = () => {
  return (
    <>
      <img alt="Bag" src={bagImg} />
      ADD TO BAG
    </>
  )
}

const ItemPage = () => {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);


  const handleGetOneItem = async (id) => {
    try {
      const item = await getItem(id)
      if (item) {
        setCurrentItem(item)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }


  useEffect(() => {
    if (id) {
      handleGetOneItem(id);
    }
  }, [id])

  if (!currentItem) {
    return <SpinnerComponent />
  }

  return (
    <div className='itemPage'>
      <Container>
        <div className='item-container'>
          <div className='item-image'>
            <img src={apiUrl + '/' + currentItem.img} alt='Items' />
          </div>
          <div className='item-info'>
            <h1 className='item-title'>{currentItem.name} <span>item # {currentItem.id}</span></h1>
            <p className='item-rating'><StarsGroup rating={currentItem.rating} /></p>
            <p className='item-price'><span>As low as <br></br></span>${currentItem.price}</p>
            <div className='item-sizes'>
              {currentItem?.itemSizes?.length &&
                <>
                  <h3>size:</h3>
                  <div className='item-sizes_container'>
                    {currentItem.itemSizes.sort().map(size => <Button active={size === +currentSize} onClick={e => setCurrentSize(e.target.value)} value={size} key={size}>{size}</Button>)}
                  </div>
                </>
              }
            </div>
            <CustomButton styles={{display: 'flex', alignItems: 'center', gap: '15px', color:'white', fontSize: '24px', fontFamily: 'Oswald-Regular'}} content={<ContentButton/>}/>
            <div className='item-socials'>
              <img alt='social' src={facebookImg}/>
              <img alt='social' src={twitterImg}/>
              <img alt='social' src={pinterestImg}/>
              <img alt='social' src={linkImg}/>
            </div>
          </div>
        </div>
        <div className='shopping'>
          <div className='shopping-article'>
            <div className='shopping-title'>- Worry Free Shopping -</div>
            <div className='shopping-container'>
              <div className='shopping-text'>
                <img src={carImg} alt='Shopping'/>
                <p>FREE PRIORITY SHIPPING ON ORDERS $99+*</p>
              </div>
              <div className='shopping-text'>
                <img src={boxImg} alt='Shopping'/>
                <p>FREE RETURNS & EXCHANGES*</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ItemPage
