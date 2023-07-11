import React, { useContext, useEffect, useState } from 'react'
import "../Styles/Basket.scss";
import { Container } from 'react-bootstrap';
import { apiUrl } from '../Config/serverAPI';
import binImg from '../Assets/image/basket/bin.svg'
import CustomButton from '../Components/Button/CustomButton';

const Basket = () => {
  const [basketItems, setBasketItems] = useState(null);
  const [isChanged, setChanged] = useState(null);
  const [amoutState, setAmountState] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);

  const handleDeleteItem = (item) => {
    const newItems = basketItems.filter(elem => elem.size !== item.size || elem.itemId !== item.itemId);
    setBasketItems(newItems)
    const localItems = JSON.parse(localStorage.getItem("basket"));
    console.log(newItems, localItems)
    if (localItems?.items) {
      const newLocalItems = localItems.items.filter(elem => elem.size !== item.size || elem.itemId !== item.itemId)
      localStorage.setItem("basket", JSON.stringify({ items: newLocalItems }));
    }
  }

  const handleChangeAmount = (index) => {
    if (isChanged) {
      if (amoutState <= 50 && amoutState > 0 && +amoutState === Math.round(+amoutState)) {
        setBasketItems(prev => prev.map((elem, i) => {
          if (index === ++i) {
            elem.count = +amoutState;
          }
          return elem;
        }))
        setChanged(null)
        setAmountState(1)
      }
    } else {
      setChanged({ status: true, id: index })
    }
  }

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("basket"));
    if (localItems?.items) {
      const newItems = localItems.items.map(item => ({ ...item, count: 1 }))
      setBasketItems(newItems)
    }
  }, [])


  useEffect(() => {
    if(basketItems) {
      const suma = basketItems.reduce((sum, cur) => sum + cur.price*cur.count, 0)
      setTotalPrice(suma)
    }
  }, [basketItems])

  return (
    <div className='basket'>
      <h1>Your Basket:</h1>
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
                      <p className='d-flex align-items-center gap-3'>
                        Amount: {item.count}
                        {isChanged?.status && index === isChanged?.id && <input style={{ height: '36px', fontSize: '22px', maxWidth: '60px' }} onChange={e => setAmountState(e.target.value)} value={amoutState} type='number' />}
                        <CustomButton onClick={() => handleChangeAmount(index)} styles={{ padding: '3px 8px', backgroundColor: '#CD9431' }} content={'Change amount'}></CustomButton>
                      </p>
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
              <p style={{margin: 0}}>Total: {totalPrice && totalPrice} $</p>
              <CustomButton styles={{ fontFamily: 'Oswald-Medium', fontSize: '40px' }} content={'Make an order'} />
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
