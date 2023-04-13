import './index.css'
import {Link} from 'react-router-dom'

const NotFound = props => {
  const {retry} = props
  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dsmezwsiq/image/upload/v1681385960/BookHub/Not-found-img_mm54wn.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="failure-msg">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <Link to="/" className="link">
        <button type="button" className="home-btn" onClick={retry}>
          Go Back To Home
        </button>
      </Link>
    </div>
  )
}
export default NotFound
