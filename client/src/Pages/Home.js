import React, { useEffect, useState } from 'react'
import "../Styles/Homepage.scss";
import manImg1 from "../Assets/homepage/man1.jpg"
import manImg2 from "../Assets/homepage/man2.png"
import manImg3 from "../Assets/homepage/man3.png"
import yearsImg from "../Assets/homepage/50years.png"
import walkingImg from "../Assets/homepage/walking-bg.jpg"
import pantsImg from "../Assets/homepage/pants-image.png"
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

const Home = () => {
  const [heightWindow, setHeightWindow] = useState(null);

  useEffect(() => {
    setHeightWindow(window.innerHeight);
  }, [])

  return (
    <div id="homePage">
      <Container>
        <section className='greeting' style={{ height: heightWindow - 96 < 650 ? '650px' : heightWindow - 96 }}>
          <div className='greeting-left'>
            <h2 className='main-title'>BEST SELLING <br></br> STRETCH SHORTS</h2>
            <p className='main-text'>Get the perfect fit with 6 different inseam lengths.</p>
            <Button className='main-button' variant="outline-dark">SHOP ALL SHORTS</Button>
          </div>
          <div className='greeting-right'>
            <div style={{ position: 'relative' }}>
              <img style={{ height: '500px' }} className='greeting-img' alt='Man1' src={manImg1} />
              <div style={{ border: '1px solid #A04955', top: '150px', left: '-150px' }} className='border-img'></div>
              <div style={{ backgroundColor: '#A04955', top: '-50px', left: '-30px' }} className='border-img'></div>
            </div>
          </div>
        </section>
      </Container>

      <section className='sales'>
        <Container>
          <div className='sales-title'>
            <h3>TGIF, INLET, AND MARCHAL'S COLLECTIONS</h3>
            <h2>NOW 40% OFF!</h2>
          </div>
        </Container>
      </section>

      <section className='bestseller'>
        <Container>
          <div className='bestseller-container'>
            <div className='bestseller-left'>
              <img alt='Pants' src={pantsImg} />
              <div style={{ top: 0, right: '0%', border: '1px solid #A04955' }} className='border-img'></div>
              <div style={{ bottom: '0%', left: 0, border: '1px solid #A04955' }} className='border-img'></div>
            </div>
            <div className='bestseller-right'>
              <h2 className='main-title'>OUR BESTSELLING <br></br> PANTS</h2>
              <p className='main-text'>Our classic cargo pants are built to last and designed to exceed your expectations! From Frequent Traveler to Hatteras to Trinidad, we have the perfect fit for you!</p>
              <Button className='main-button' variant="outline-dark">SHOP ALL SHORTS</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className='announcements'>
        <Container>
          <div className='announcements-container'>
            <div className='announcements-block'>
              <div className='announcements-photo'>
                <img alt='Man2' src={manImg2} />
                <div className='announcements-title'>NEW POWELL PRINT SHIRT</div>
              </div>
              <p style={{ marginTop: '30px' }} className='main-text'>New from Old Ranch Brands, the Powell short sleeve print shirt! Look effortlessly sharp in this lightweight cotton shirt with a classic shape and convenient features.</p>
              <Button style={{ padding: '6px 60px' }} className='main-button' variant="outline-dark">SHOP POWEL SHORT SLEEVE</Button>
            </div>
            <div className='announcements-block'>
              <div className='announcements-photo'>
                <img alt='Man2' src={manImg3} />
                <div className='announcements-title'>ECOTHS: NOW 30% OFF!</div>
              </div>
              <p style={{ marginTop: '30px' }} className='main-text'>Our entire Ecoths collection is on sale! Plus, for every Ecoths purchase we donate 3 meals to food banks across the United States. We’re over 400,000 meals in now.</p>
              <Button style={{ padding: '6px 60px' }} className='main-button' variant="outline-dark">SHOP ECOTHS SALE</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className='original'>
        <img style={{ width: '100%' }} alt='Walking' src={walkingImg} />
        <div className='original-container'>
          <Container>
            <div className='main-title' style={{ color: 'white' }}>SPORTIF <br></br> ORIGINAL PANT</div>
            <div className='main-text' style={{ color: 'white' }}>Our classic nautical cargo pants are built to last and designed to exceed your expectations! Crafted from our stretch twill blend that offers the comfort of cotton, the wrinkle resistance of polyester and the mobility of Lycra®.</div>
            <Button className='main-button' style={{ color: 'white', backgroundColor: '#A04955', border: 'none' }}>SHOP SPORTIF ORIGINAL PANT</Button>
          </Container>
        </div>
      </section>

      <section className='trend'>
        <div className='trend-container'>STAY IN TREND WITH SPORTIF</div>
      </section>

      <section className='legacy'>
        <div className='legacy-bg'></div>
        <div className='legacy-container'>
          <img src={yearsImg} alt='Legacy' />
          <div className='main-title'>FAMILY OWNED LEGACY</div>
          <div className='main-text' style={{ maxWidth: "none", marginTop: '30px', marginBottom: '30px' }}>We are proud to celebrate over 50 years of excellence as a family owned and operated business.</div>
          <Button style={{ padding: '8px 35px' }} className='main-button' variant="outline-dark">ABOUT US</Button>
        </div>
      </section>
    </div>
  )
}

export default Home
