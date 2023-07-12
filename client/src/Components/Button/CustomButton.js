import React from 'react'
import { Button } from 'react-bootstrap'
import "../../Styles/CustomButton.scss"

const CustomButton = ({content, styles = null, onClick}) => {
  return (
    <Button id='custom-btn' onClick={onClick} style={styles}>
        {content}
    </Button>
  )
}

export default CustomButton
