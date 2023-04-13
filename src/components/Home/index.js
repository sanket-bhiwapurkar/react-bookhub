import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import './index.css'
import NavBar from '../NavBar'
import LoaderItem from '../LoaderItem'
import Footer from '../Footer'
import Failure from '../Failure'

const apiStatusOptions = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {homeApiStatus: apiStatusOptions.initial, topBooksList: []}

  componentDidMount() {
    this.getTopBooksLists()
  }

  getTopBooksLists = async () => {
    this.setState({homeApiStatus: apiStatusOptions.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {books} = data
      const formattedData = books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        homeApiStatus: apiStatusOptions.success,
        topBooksList: formattedData,
      })
    } else {
      this.setState({homeApiStatus: apiStatusOptions.failure})
    }
  }

  RenderHomeText = () => (
    <div className="text-container">
      <h1 className="main-heading">Find Your Next Favorite Books?</h1>
      <p className="text-para">
        You are in the right place. Tell us what titles or genres you have
        enjoyed in the past, and we will give you surprisingly insightful
        recommendations.
      </p>
      <Link to="/shelf" className="link">
        <button type="button" className="find-books-btn">
          Find Books
        </button>
      </Link>
    </div>
  )

  RenderSlider = () => {
    const {topBooksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slider-container">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h1 className="slider-heading">Top Rated Books</h1>
          <Link to="/shelf" className="link">
            <button type="button" className="find-books-btn-desktop">
              Find Books
            </button>
          </Link>
        </div>
        <Slider {...settings}>
          {topBooksList.map(eachBook => {
            const {id, authorName, coverPic, title} = eachBook
            return (
              <div key={id} className="slide">
                <Link to={`/books/${id}`} className="link">
                  <img src={coverPic} alt={title} className="slide-img" />
                  <h1 className="slide-title">{title}</h1>
                  <p className="slide-author">{authorName}</p>
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  RenderHomeSwitch = () => {
    const {homeApiStatus} = this.state
    switch (homeApiStatus) {
      case apiStatusOptions.isLoading:
        return <LoaderItem />
      case apiStatusOptions.success:
        return (
          <>
            <this.RenderHomeText />
            <this.RenderSlider />
            <Footer />
          </>
        )
      case apiStatusOptions.failure:
        return (
          <>
            <this.RenderHomeText />
            <div className="slider-container">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 className="slider-heading">Top Rated Books</h1>
                <Link to="/shelf" className="link">
                  <button type="button" className="find-books-btn-desktop">
                    Find Books
                  </button>
                </Link>
              </div>
              <Failure retry={this.getTopBooksLists} />
            </div>
          </>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <NavBar />
        <div className="home-body">
          <this.RenderHomeSwitch />
        </div>
      </div>
    )
  }
}
export default Home
