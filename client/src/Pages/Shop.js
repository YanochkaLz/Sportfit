import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Shop = () => {
  return (
    <div className='text-center'>
      <h1>
        Shop
      </h1>
      <Button className='m-2' variant='primary'>Get all items</Button>
      <Button className='m-2' variant='primary'>Get one item</Button>
      <Card></Card>
    </div>
  )
}

export default Shop
