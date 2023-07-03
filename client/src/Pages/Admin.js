import React, { useState } from 'react'
import { Alert, Button, } from 'react-bootstrap'
import { createType } from '../API/type';
import FormComponent from '../Components/admin/FormComponent';
import { createItem } from '../API/items';

const Admin = () => {
  const [showType, setShowType] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [succesfulAdd, setSuccessfulAdd] = useState(false)

  const handleAddType = async(data) => {  
    const {name} = data;
    try {
      const response = await createType(name);
      if(response) {
        setSuccessfulAdd(true)
      }
    } catch(e) {
      alert(e.response.data.message)
    }
  }

  const handleAddItem = async(data) => { 
    const {name, type, price, file, itemSizes} = data;
    const reqData = new FormData();
    reqData.append('name', name);
    reqData.append('price', parseInt(price));
    reqData.append('typeId', type);
    reqData.append('img', file);
    reqData.append('itemSizes', itemSizes);

    try {
      const response = await createItem(reqData);
      if(response) {
        setSuccessfulAdd(true)
      }
      console.log(response)
    } catch(e) {
      alert(e.response.data.message)
    }
  }


  return (
    <div className='text-center'>
      <h1>
        Admin
      </h1>
      <Button onClick={() => setShowType(prev => !prev)} className='m-2' variant='primary'>Create type</Button>
      <Button onClick={() => setShowItem(prev => !prev)} className='m-2' variant='primary'>Create item</Button>
      <Alert show={succesfulAdd} variant="success">
        <p>
          Успешно добавлено в базу данных!
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => setSuccessfulAdd(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      <FormComponent onShow={showType} toggleShow={setShowType} onAdd={handleAddType}/>
      <FormComponent isItemForm={true} onShow={showItem} toggleShow={setShowItem} onAdd={handleAddItem}/>
    </div>
  )
}

export default Admin
