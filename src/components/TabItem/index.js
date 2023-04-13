import './index.css'

const TabItem = props => {
  const {tabDetails, updateTab, isActive} = props
  const {id, label} = tabDetails
  const tabClassName = isActive ? 'active-tab' : ''
  return (
    <li className="tab-item">
      <button
        type="button"
        className={`tab-btn ${tabClassName}`}
        onClick={() => updateTab(id)}
      >
        {label}
      </button>
    </li>
  )
}
export default TabItem
