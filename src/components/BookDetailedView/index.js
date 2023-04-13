import {BsFillStarFill} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import NavBar from '../NavBar'
import LoaderItem from '../LoaderItem'
import Failure from '../Failure'
import Footer from '../Footer'

const apiStatusOptions = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetailedView extends Component {
  state = {bookDetails: {}, detailsApiStatus: apiStatusOptions.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({detailsApiStatus: apiStatusOptions.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const bookDetails = data.book_details
      const formattedData = {
        id: bookDetails.id,
        authorName: bookDetails.author_name,
        coverPic: bookDetails.cover_pic,
        aboutBook: bookDetails.about_book,
        rating: bookDetails.rating,
        readStatus: bookDetails.read_status,
        title: bookDetails.title,
        aboutAuthor: bookDetails.about_author,
      }
      this.setState({
        bookDetails: formattedData,
        detailsApiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({detailsApiStatus: apiStatusOptions.failure})
    }
  }

  RenderDetails = () => {
    const {bookDetails} = this.state
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails
    return (
      <div className="details-body">
        <div className="main-details">
          <img src={coverPic} alt={title} className="details-img" />
          <div className="details-item-text">
            <h1 className="details-title">{title}</h1>
            <p className="details-author">{authorName}</p>
            <div className="details-rating-container">
              <p>Avg Rating</p>
              <BsFillStarFill style={{color: '#FBBF24', margin: '0px 8px'}} />
              <p>{rating}</p>
            </div>
            <p className="details-status">
              Status: <span style={{color: '#0284C7'}}>{readStatus}</span>
            </p>
          </div>
        </div>
        <hr style={{width: '100%', border: '1px solid #94A3B8'}} />
        <h1 className="about-heading">About Author</h1>
        <p className="about">{aboutAuthor}</p>
        <h1 className="about-heading">About Book</h1>
        <p className="about">{aboutBook}</p>
      </div>
    )
  }

  RenderDetailsSwitch = () => {
    const {detailsApiStatus} = this.state
    switch (detailsApiStatus) {
      case apiStatusOptions.isLoading:
        return <LoaderItem />
      case apiStatusOptions.success:
        return (
          <>
            <this.RenderDetails />
            <Footer />
          </>
        )
      case apiStatusOptions.failure:
        return <Failure retry={this.getBookDetails} />

      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-container">
        <NavBar />
        <this.RenderDetailsSwitch />
      </div>
    )
  }
}
export default BookDetailedView
