import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerComponent = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner animation="border" variant="danger" />
        </div>
    )
}

export default SpinnerComponent
