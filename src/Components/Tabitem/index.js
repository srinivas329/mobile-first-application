
import './index.css'

const Tabitem = (props) => {
    const {details,clickTabitem,isActive} = props 
    const {displayText, tabId} = details

    const oncliclTabItem = () => {
        clickTabitem(tabId)

    }

    const activetabColor = isActive ? 'active-tab-btn' : ''

    return (
        <li className="buttons-tab">
            <button onClick={oncliclTabItem} type="button" className={`tab-btns ${activetabColor}`}>{displayText}</button>
        </li>
    )
}

export default Tabitem
