import React, { Children, useState } from 'react'
import { Alert, Button, } from 'react-bootstrap'
import { createType } from '../API/type';
import FormComponent from '../Components/admin/FormComponent';
import { createItem } from '../API/items';
import CustomButton from '../Components/Button/CustomButton';
import "../Styles/Admin.scss";

const Admin = () => {
  const [showType, setShowType] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [succesfulAdd, setSuccessfulAdd] = useState(false)

  const handleAddType = async (data) => {
    const { name } = data;
    try {
      const response = await createType(name);
      if (response) {
        setSuccessfulAdd(true)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const handleAddItem = async (data) => {
    const { name, type, price, file, itemSizes } = data;
    const reqData = new FormData();
    reqData.append('name', name);
    reqData.append('price', parseFloat(price));
    reqData.append('typeId', type);
    reqData.append('img', file);
    reqData.append('itemSizes', itemSizes);

    try {
      const response = await createItem(reqData);
      if (response) {
        setSuccessfulAdd(true)
      }
      console.log(response)
    } catch (e) {
      alert(e.response.data.message)
    }
  }


  return (
    <div className='admin text-center'>
      <h1 className='admin-title'>
        Admin panel
      </h1>
      <hr></hr>
      <CustomButton className='admin-btn' content={'Create type'} onClick={() => setShowType(prev => !prev)}></CustomButton>
      <CustomButton content={'Create item'} onClick={() => setShowItem(prev => !prev)}></CustomButton>
      <Alert show={succesfulAdd} variant="success">
        <p>
          Successfully added to the database!
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => setSuccessfulAdd(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      <FormComponent onShow={showType} toggleShow={setShowType} onAdd={handleAddType} />
      <FormComponent isItemForm={true} onShow={showItem} toggleShow={setShowItem} onAdd={handleAddItem} />
    </div>
  )
}

export default Admin
