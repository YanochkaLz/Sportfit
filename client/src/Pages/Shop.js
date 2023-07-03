import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { getItem, getItems } from '../API/items'
const LIMIT = 12;

const Shop = () => {

  const handleGetAllItems = async() => {
    const items = await getItems()
    console.log(items)
  }

  const handleGetOneItem = async(id) => {
    const items = await getItem(id)
    console.log(items)
  }

  return (
    <div className='text-center'>
      <h1>
        Shop
      </h1>
      <Button onClick={handleGetAllItems} className='m-2' variant='primary'>Get all items</Button>
      <Button onClick={() => handleGetOneItem(8)} className='m-2' variant='primary'>Get one item</Button>
      <Card></Card>
    </div>
  )
}

export default Shop
