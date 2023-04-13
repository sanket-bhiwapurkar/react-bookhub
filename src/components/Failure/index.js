import './index.css'

const Failure = props => {
  const {retry} = props
  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dsmezwsiq/image/upload/v1681306588/BookHub/Failure-img_kwqynw.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={retry}>
        Try Again
      </button>
    </div>
  )
}
export default Failure
