import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, Modal } from 'react-bootstrap'
import { getTypes } from '../../API/type'

const FormComponent = ({ onShow, toggleShow, onAdd, isItemForm = false }) => {
    const {
        register,
        formState: {
            isValid
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "all"
    })

    const [types, setTypes] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState('');
    const [currentFile, setCurrentFile] = useState(null);

    const handleAdd = (data) => {
        if (currentFile && isItemForm) {
            const { type } = data;
            const typeId = type ? types.find(typeName => typeName.name === type) : types[0];

            toggleShow(prev => !prev)
            onAdd({ ...data, itemSizes: sizes, type: typeId?.id, file: currentFile});
            // reset();
        }
        if (!isItemForm) {
            toggleShow(prev => !prev)
            onAdd(data);
            // reset();
        }
    }

    useEffect(() => {
        if (isItemForm && onShow) {
            handleGetAllTypes();
        }
    }, [onShow, isItemForm])

    const handleGetAllTypes = async () => {
        const data = await getTypes();
        setTypes(data);
    }

    const handleDeleteSize = (index) => {
        setSizes(prev => prev?.filter((_, i) => i !== index));
    }


    return (
        <Modal show={onShow} onHide={() => {
            // reset()
            toggleShow(prev => !prev)
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Create {isItemForm ? 'Item' : 'Type'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleAdd)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a name"
                            {...register('name', {
                                required: 'Поле обязательно к заполнению!',
                                minLength: {
                                    value: 2,
                                    message: 'Минимум 2 символа!'
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Максимум 50 символов!'
                                },
                            })}
                        />
                    </Form.Group>
                    {isItemForm &&
                        <>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Type</Form.Label>
                                <Form.Select {...register('type')}>
                                    {types?.map(type =>
                                        <option key={type.id}>{type.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    {...register('file', {
                                        required: 'Поле обязательно к заполнению!',
                                    })}
                                    onChange={e => setCurrentFile(e.target.files[0])}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter price of clothing in dollars"
                                    {...register('price', {
                                        required: 'Поле обязательно к заполнению!',
                                    })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Sizes</Form.Label>
                                <div className='d-flex gap-4 align-items-center'>
                                    <Form.Control
                                        style={{ width: '40%' }}
                                        type="number"
                                        placeholder="Enter a size"
                                        value={size}
                                        onChange={e => setSize(e.target.value)}
                                    />
                                    <Button onClick={() => {
                                        if (size) {
                                            setSizes(prev => [...prev, parseFloat(size)]);
                                            setSize('')
                                        }
                                    }}>Add size</Button>

                                </div>
                                <div className='mt-3'>
                                    {sizes && sizes?.length > 0 &&
                                        sizes?.map((size, i) =>
                                            <Form.Check
                                                checked
                                                key={i}
                                                inline
                                                onChange={() => handleDeleteSize(i)}
                                                label={size}
                                                type='checkbox'
                                            />
                                        )
                                    }
                                </div>
                            </Form.Group>
                        </>
                    }
                    <hr></hr>
                    <Button disabled={!isValid} style={{ width: '100%' }} variant="primary" type='submit'>
                        Add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default FormComponent
