import './index.css'

const NoSearchFound = props => {
  const {searchValue} = props
  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dsmezwsiq/image/upload/v1681380422/BookHub/no-search-img_na7qpj.png"
        alt="no books"
        className="failure-img"
      />
      <p className="failure-msg">
        Your search for {searchValue} did not find any matches.
      </p>
    </div>
  )
}
export default NoSearchFound
