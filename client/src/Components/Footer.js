import React from 'react'
import "../Styles/Footer.scss"
import CustomButton from './Button/CustomButton'


const Footer = () => {
    return (
        <footer>
            <div className='footer' id='footer'>
                <div className='footer-column'>
                    <h3 className='footer-column_title'>ORDERING ONLINE</h3>
                    <ul className='footer-column_list'>
                        <li>Account Login</li>
                        <li>Our Guarantee</li>
                        <li>Sportif Stretch Guide</li>
                        <li>Size Chart & Sizing Information</li>
                        <li>Hemming Information</li>
                        <li>Ordering & Payment</li>
                        <li>Shipping Information</li>
                        <li>Returns</li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <h3 className='footer-column_title'>ABOUT SPORTIF</h3>
                    <ul className='footer-column_list'>
                        <li>COVID-19 Response</li>
                        <li>History</li>
                        <li>Legacy</li>
                        <li>Good Sam Program</li>
                        <li>Privacy & Security</li>
                        <li>Terms & Conditions</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <h3 className='footer-column_title'>QUICK LINKS</h3>
                    <ul className='footer-column_list'>
                        <li>FAQs</li>
                        <li>Shop Online Catalog</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <h3 className='footer-column_title'>GET TO KNOW US</h3>
                    <p className='footer-column_text'>Sign up for our weekly newsletter and get a 10% off coupon by email for your first order!</p>
                    <label className='footer-column_text'>
                        <p style={{ marginBottom: '20px' }}>Sign Up for Our Newsletter:</p>
                        <div className='input-holder'>
                            <input placeholder='EMAIL ADDRESS' type='email' className='footer-input'></input>
                            <CustomButton content={'Subscribe'}></CustomButton>
                        </div>
                    </label>

                </div>
            </div>
        </footer>
    )
}

export default Footer
