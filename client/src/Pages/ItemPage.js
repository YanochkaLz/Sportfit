import React, { Children, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
import { Context } from "../index"
import { createRating, getInfoItem } from '../API/rating';

const ContentButton = () => {
  return (
    <>
      <img alt="Bag" src={bagImg} />
      ADD TO BASKET
    </>
  )
}

const ItemPage = () => {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [infoItem, setInfoItem] = useState(null);
  const [isAlert, setAlert] = useState(false)
  const { user } = useContext(Context);
  const nav = useNavigate();

  const handleGetOneItem = async (id) => {
    try {
      const item = await getItem(id)
      if (item) {
        setCurrentItem(item)
      }
    } catch (e) {
      alert(e.response)
    }
  }

  const handleChangeRatingItem = async (rate) => {
    if (user.isAuth && user._user.id && currentItem.id) {
      try {
        const response = await createRating({ rate: parseInt(rate) + 1, userId: user._user.id, itemId: currentItem.id })
        if (response) {
          setCurrentItem(prev => ({ ...prev, rating: response.averageRating }))
        }
      } catch (e) {
        alert(e.response)
      }
    }
  }

  const handleGettingItemInfo = async (userId, itemId) => {
    try {
      const response = await getInfoItem(userId, parseInt(itemId))
      if (response) {
        setInfoItem(response);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddToBasket = () => {
    if (!user.isAuth) {
      nav('/login')
    } else {
      if (!currentSize && currentItem.typeId !== 4) {
        setAlert(true)
      } else {
        const basket = JSON.parse(localStorage.getItem("basket"));
        if (!basket) {
          const data = { items: [{ itemId: currentItem.id, size: currentSize, img: currentItem.img, name: currentItem.name, price: currentItem.price }] }
          localStorage.setItem("basket", JSON.stringify(data));
        } else {
          const { items } = basket
          const existingItem = items.find(item => item.itemId === currentItem.id && item.size === currentSize)
          if (!existingItem) {
            items.push({ itemId: currentItem.id, size: currentSize, img: currentItem.img, name: currentItem.name, price: currentItem.price })
            localStorage.setItem("basket", JSON.stringify({ items: items }));
          }
        }

        nav('/basket')
      }
    }
  }


  useEffect(() => {
    if (id) {
      handleGetOneItem(id);
    }
  }, [id])

  useEffect(() => {
    if (user?._user?.id && currentItem && id) {
      handleGettingItemInfo(user._user.id, id);
    }
  }, [id, user, currentItem])


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
            {user?.isAuth ?
              <div style={{ display: "flex", alignItems: 'center' }}>
                <div className='item-blockedRating'>overall product rating: <br></br><StarsGroup rating={currentItem.rating} /></div>
                {infoItem &&
                  <>
                    <div style={{ marginLeft: '60px' }} className='item-rating'>rate this item:<br></br><StarsGroup onClick={(e) => handleChangeRatingItem(e)} rating={infoItem.rating} /></div>
                    <div style={{ marginLeft: '60px', fontSize: '15px', textTransform: 'uppercase', fontFamily: 'Oswald-Regular' }}>{infoItem.count} REVIEWS</div>
                  </>
                }
              </div> :
              <>
                <span>overall product rating:</span>
                <p className='item-blockedRating'><StarsGroup rating={currentItem.rating} /></p>
              </>
            }
            <p className='item-price'><span>As low as <br></br></span>${currentItem.price}</p>

            {currentItem.typeId !== 4 &&
              <div className='item-sizes'>
                {currentItem?.itemSizes?.length &&
                  <>
                    <h3>size:</h3>
                    <div className='item-sizes_container'>
                      {currentItem.itemSizes.sort().map(size => <Button active={size === +currentSize} onClick={e => { setCurrentSize(e.target.value); setAlert(false) }} value={size} key={size}>{size}</Button>)}
                      {isAlert && <div style={{ color: '#A04955', fontFamily: 'Oswald-Medium' }}>Choose a size!</div>}
                    </div>
                  </>
                }
              </div>
            }

            <CustomButton onClick={handleAddToBasket} styles={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white', fontSize: '24px', fontFamily: 'Oswald-Regular' }} content={<ContentButton />} />
            <div className='item-socials'>
              <a target='_blank' href='https://facebook.com'>
                <img alt='social' src={facebookImg} />
              </a>
              <a target='_blank' href='https://twitter.com'>
                <img alt='social' src={twitterImg} />
              </a>
              <a target='_blank' href='https://pinterest.com'>
                <img alt='social' src={pinterestImg} />
              </a>
              <a target='_blank' href=''>
                <img alt='social' src={linkImg} />
              </a>
            </div>
          </div>
        </div>
        <div className='shopping'>
          <div className='shopping-article'>
            <div className='shopping-title'>- Worry Free Shopping -</div>
            <div className='shopping-container'>
              <div className='shopping-text'>
                <img src={carImg} alt='Shopping' />
                <p>FREE PRIORITY SHIPPING ON ORDERS $99+*</p>
              </div>
              <div className='shopping-text'>
                <img src={boxImg} alt='Shopping' />
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
