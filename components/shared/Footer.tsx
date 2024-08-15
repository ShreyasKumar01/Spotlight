import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" id="footer76">
            <div className="footcontain">
                <div className="row">
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li> <a href="#">About Us</a></li>
                            <li> <a href="#">Our Services</a></li>
                            <li> <a href="#">Privacy Policy</a></li>
                            <li> <a href="#">Our Outlets</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Get Help</h4>
                        <ul>
                            <li> <a href="#">FAQ</a></li>
                            <li> <a href="#">Orders</a></li>
                            <li> <a href="#">Order Status</a></li>
                            <li> <a href="#">Payment Options</a></li>
                            <li> <a href="#">Ratings</a></li>
                            <li> <a href="#">Reviews</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact Us</h4>
                        <ul>
                            <li> <a href="#">Contact Number: 9998884444</a></li>
                            <li> <a href="#">Instagram: @Spotlight</a></li>
                            <li> <a href="#">Facebook: Spotlight </a></li>
                            <li> <a href="#">Email: spotlight773@gmail.com</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Follow Us</h4>
                        <ul>
                            <li> <a href="#">Instagram</a></li>
                            <li> <a href="#">Twitter</a></li>
                            <li> <a href="#">Facebook</a></li>
                            <li> <a href="#">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
  );
};

export default Footer;