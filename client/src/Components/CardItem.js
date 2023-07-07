import React from 'react'
import Card from 'react-bootstrap/Card';
import { apiUrl } from '../Config/serverAPI';
import bagImg from "../Assets/image/shop/Bag.svg"
import CustomButton from './Button/CustomButton';
import '../Styles/Card.scss'
import greyStarImg from '../Assets/image/shop/Star1.svg'
import yellowStarImg from '../Assets/image/shop/Star2.svg'

const ContentButton = () => {
  return (
    <>
      <img alt="Bag" src={bagImg} />
      Add to Cart
    </>
  )
}

const StarsGroup = ({ rating }) => {
  return (
    <>
      {new Array(5).fill(1).map((_, index) => <img key={index} alt='Star' src={index < rating ? yellowStarImg : greyStarImg} />)}
    </>
  )
}

const CardItem = ({ item }) => {

  return (
    <Card style={{ width: '18rem' }}>
      <div className='img-container'>
        <Card.Img variant="top" src={apiUrl + '/' + item.img} />
      </div>
      <Card.Body style={{ padding: 0 }}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text style={{ margin: 0 }}><StarsGroup rating={item.rating} /></Card.Text>
        <Card.Text className='card-price' style={{ marginTop: '10px', marginBottom: '30px' }}>As low as <span>${item.price}</span></Card.Text>
        <CustomButton styles={{ fontFamily: 'Oswald-Regular', fontSize: '18px' }} content={<ContentButton />} />
      </Card.Body>
    </Card>
  )
}

export default CardItem
