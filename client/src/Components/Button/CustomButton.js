import React from 'react'
import { Button } from 'react-bootstrap'
import "../../Styles/CustomButton.scss"

const CustomButton = ({content, styles = null}) => {
  return (
    <Button id='custom-btn' style={styles}>
        {content}
    </Button>
  )
}

export default CustomButton
