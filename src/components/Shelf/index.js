import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'
import NavBar from '../NavBar'
import LoaderItem from '../LoaderItem'
import TabContainer from '../TabContainer'
import BookItem from '../BookItem'
import Footer from '../Footer'
import NoSearchFound from '../NoSearchFound'
import Failure from '../Failure'

const apiStatusOptions = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Shelf extends Component {
  state = {
    booksApiStatus: apiStatusOptions.initial,
    booksList: [],
    searchText: '',
    bookshelf: bookshelvesList[0],
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({booksApiStatus: apiStatusOptions.isLoading})
    const {bookshelf, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelf.value}&search=${searchText}`
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
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      this.setState({
        booksApiStatus: apiStatusOptions.success,
        booksList: formattedData,
      })
    } else {
      this.setState({booksApiStatus: apiStatusOptions.failure})
    }
  }

  updateTab = id => {
    this.setState(
      {
        bookshelf: [...bookshelvesList.filter(eachTab => id === eachTab.id)][0],
      },
      this.getBooksList,
    )
  }

  onSearchInputChange = event => {
    this.setState({searchText: event.target.value})
  }

  RenderShelfSwitch = () => {
    const {booksApiStatus, booksList, searchText} = this.state
    switch (booksApiStatus) {
      case apiStatusOptions.success:
        return booksList.length === 0 ? (
          <NoSearchFound searchValue={searchText} />
        ) : (
          <>
            <ul className="books-list">
              {booksList.map(eachBook => (
                <BookItem key={eachBook.id} bookDetails={eachBook} />
              ))}
            </ul>
            <Footer />
          </>
        )
      case apiStatusOptions.failure:
        return <Failure retry={this.getBooksList} />

      default:
        return null
    }
  }

  render() {
    const {bookshelf, searchText, booksApiStatus} = this.state
    return (
      <div className="shelf-container">
        <NavBar />
        {booksApiStatus === apiStatusOptions.isLoading ? (
          <LoaderItem />
        ) : (
          <div className="shelf-body">
            {Window.innerWidth < 768 && (
              <div className="searchbar">
                <input
                  type="search"
                  placeholder="Search"
                  className="search"
                  value={searchText}
                  onChange={this.onSearchInputChange}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.getBooksList}
                  testid="searchButton"
                >
                  <BsSearch size={15} />
                </button>
              </div>
            )}
            <div className="tabs-books-container">
              <TabContainer
                bookshelvesList={bookshelvesList}
                updateTab={this.updateTab}
                bookshelfId={bookshelf.id}
              />
              <div className="books-container">
                <div className="sub-header">
                  <h1 className="sub-header-heading">
                    {bookshelf.label} Books
                  </h1>
                  <div className="searchbar" style={{display: 'flex'}}>
                    <input
                      type="search"
                      placeholder="Search"
                      className="search"
                      value={searchText}
                      onChange={this.onSearchInputChange}
                    />
                    <button
                      type="button"
                      className="search-btn"
                      onClick={this.getBooksList}
                      testid="searchButton"
                    >
                      <BsSearch size={15} />
                    </button>
                  </div>
                </div>
                <this.RenderShelfSwitch />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default Shelf
