import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="icon-container">
      <FaGoogle style={{margin: '0px 8px'}} />
      <FaTwitter style={{margin: '0px 8px'}} />
      <FaInstagram style={{margin: '0px 8px'}} />
      <FaYoutube style={{margin: '0px 8px'}} />
    </div>
    <p className="footer-text">Contact us</p>
  </div>
)
export default Footer
