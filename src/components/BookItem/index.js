import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails
  return (
    <li className="book-item">
      <Link to={`/books/${id}`} className="link" style={{display: 'flex'}}>
        <img src={coverPic} alt={title} className="book-thumbnail" />
        <div className="book-item-text">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{authorName}</p>
          <div className="rating-container">
            <p>Avg Rating</p>
            <BsFillStarFill style={{color: '#FBBF24', margin: '0px 4px'}} />
            <p>{rating}</p>
          </div>
          <p className="book-status">
            Status: <span style={{color: '#0284C7'}}>{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}
export default BookItem
