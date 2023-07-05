import React from 'react'
import './style.scss'
import { Button } from 'react-bootstrap';
import arrowImg from "../../Assets/homepage/Arrow.svg"

const ScrollToTop = () => {
  window.onload = () => {
    const btn = document.querySelector('#myBtn');
    btn.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    })

    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
      } else {
        document.getElementById("myBtn").style.display = "none";
      }
    })
  }

  return (
    <Button id="myBtn"><img src={arrowImg} alt='Arrow'/></Button>
  )
}

export default ScrollToTop
