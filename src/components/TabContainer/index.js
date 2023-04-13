import './index.css'
import TabItem from '../TabItem'

const TabContainer = props => {
  const {updateTab, bookshelvesList, bookshelfId} = props

  return (
    <div className="tabs-container">
      <h1 className="tabs-heading">Bookshelves</h1>
      <ul className="tab-list">
        {bookshelvesList.map(eachTab => (
          <TabItem
            tabDetails={eachTab}
            key={eachTab.id}
            updateTab={updateTab}
            isActive={bookshelfId === eachTab.id}
          />
        ))}
      </ul>
    </div>
  )
}
export default TabContainer
