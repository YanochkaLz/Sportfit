import React, { useContext, useEffect, useState } from 'react'
import "../Styles/Basket.scss";
import { Context } from "../index"
import { Container } from 'react-bootstrap';
import { apiUrl } from '../Config/serverAPI';
import binImg from '../Assets/image/basket/bin.svg'
import CustomButton from '../Components/Button/CustomButton';

const Basket = () => {
  const { user } = useContext(Context);
  const [basketItems, setBasketItems] = useState(null)


  console.log(basketItems)

  const handleDeleteItem = (item) => {
    // setBasketItems(prev => prev.filter(elem => elem.id !== item.id && elem.size !== item.size))
    // const localItems = JSON.parse(localStorage.getItem("basket"));
    // if (localItems?.items) {
    //   // const newItems = localItems.items.filter(elem)
    // }
  }

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("basket"));
    if (localItems?.items) {
      const newItems = localItems.items.map(item => ({ ...item, count: 1 }))
      setBasketItems(newItems)
    }
  }, [])


  return (
    <div className='basket'>
      <h2>
        Hello{user._user.name && `, ${user._user.name}!`}
      </h2>
      <h1>Your Basket</h1>
      <hr></hr>
      <Container>
        {basketItems?.length ?
          <div>
            <div className='basket-list'>
              {basketItems.map((item, index) =>
                <div className='basket-list_item' key={index}>
                  <div className='item-img'>
                    {++index}
                    <img style={{ marginLeft: '50px' }} alt='Item' src={apiUrl + '/' + item.img} />
                  </div>

                  <div className='item-info'>
                    <h3 className='item-info_title'>{item.name}</h3>
                    <div className='item-info_text'>
                      {item?.size &&
                        <p>Size: {item.size}</p>
                      }
                      <p>Amount: {item.count}</p>
                      <p>Price: {item.price * item.count}$</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img onClick={() => handleDeleteItem(item)} style={{ cursor: 'pointer' }} src={binImg} alt="Bin" />
                  </div>
                </div>
              )}
            </div>

            <div className='basket-bottom'>
              <p>Total: </p>
              <CustomButton styles={{fontFamily: 'Oswald-Medium', fontSize: '40px'}} content={'Make an order'}/>
            </div>
          </div>
          :
          <p className='basket-empty'>Basket is empty!</p>
        }
      </Container>
    </div>
  )
}

export default Basket
