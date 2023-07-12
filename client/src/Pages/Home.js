import React, { useEffect, useState } from 'react'
import "../Styles/Homepage.scss";
import manImg1 from "../Assets/image/homepage/man1.jpg"
import manImg2 from "../Assets/image/homepage/man2.png"
import manImg3 from "../Assets/image/homepage/man3.png"
import yearsImg from "../Assets/image/homepage/50years.png"
import walkingImg from "../Assets/image/homepage/walking-bg.jpg"
import pantsImg from "../Assets/image/homepage/pants-image.png"
import beltsImg from "../Assets/image/homepage/belts.png"
import tiesImg from "../Assets/image/homepage/ties.webp"
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import CustomButton from '../Components/Button/CustomButton';
import { useNavigate } from 'react-router-dom'
import { getItems } from '../API/items';
import CardItem from '../Components/CardItem';

const idItems = []

const Home = () => {
  const [heightWindow, setHeightWindow] = useState(null);
  const nav = useNavigate();
  const [someItems, setSomeItems] = useState(null);

  const gettingSomeItems = async () => {
    try {
      const responseShorts = await getItems(1, 1, 2);
      const responsePants = await getItems(2, 1, 2);
      setSomeItems({ pants: responsePants.rows, shorts: responseShorts.rows });
    } catch (e) {
      alert(e.response)
    }
  }

  useEffect(() => {
    setHeightWindow(window.innerHeight);
    gettingSomeItems()
  }, [])

  return (
    <div id="homePage">
      <Container>
        <section className='greeting' style={{ height: heightWindow - 96 < 650 ? '650px' : heightWindow - 96 }}>
          <div className='greeting-left'>
            <h2 className='main-title'>BEST SELLING <br></br> STRETCH SHORTS</h2>
            <p className='main-text'>Get the perfect fit with 6 different inseam lengths.</p>
            <Button onClick={() => nav('/shop/1')} className='main-button' variant="outline-dark">SHOP ALL SHORTS</Button>
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

      <section id='sales' className='sales'>
        <Container>
          <div className='sales-title'>
            <h3>TGIF, INLET, AND MARCHAL'S COLLECTIONS</h3>
            <h2>NOW 40% OFF!</h2>
          </div>
          {someItems &&
            <div className='sales-items'>
              {someItems.shorts.map(item => <CardItem onClick={() => nav('/item/' + item.id)} key={item.id} item={item} />)}
              {someItems.pants.map(item => <CardItem onClick={() => nav('/item/' + item.id)} key={item.id} item={item} />)}
            </div> 
          }

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
              <Button onClick={() => nav('/shop/2')} className='main-button' variant="outline-dark">SHOP ALL PANTS</Button>
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
            <CustomButton styles={{ fontSize: '24px' }} content={'SHOP SPORTIF ORIGINAL PANT'} />
          </Container>
        </div>
      </section>

      <section className='trend'>
        <div className='trend-container'>STAY IN TREND WITH SPORTIF</div>
        <div className='trend-list'>
          <div className='trend-list_item'>
            <img src={beltsImg} alt='Belts'/>
            <h3>Don't Forget a Belt!</h3>
            <CustomButton onClick={() => nav('/shop/4')} styles={{ fontSize: '24px' }} content={'SHOP ALL BELTS'} />
          </div>
          <div className='trend-list_item'>
            <img src={tiesImg} alt='Belts'/>
            <h3>Shop Newest Ties!</h3>
            <CustomButton onClick={() => nav('/shop/4')} styles={{ fontSize: '24px' }} content={'SHOP ALL Ties'} />
          </div>
        </div>
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
