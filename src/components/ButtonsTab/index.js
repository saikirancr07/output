import {ButtonsListItem, Button, ActiveButton} from './styledComponents'

const ButtonsTab = props => {
  const {details, getTheTabItem, active} = props
  const {displayText, optionId} = details

  const ClassName = active ? ActiveButton : Button

  const clickTheTabButton = () => {
    getTheTabItem(optionId)
  }

  return (
    <ButtonsListItem>
      <ClassName type="button" onClick={clickTheTabButton}>
        {displayText}
      </ClassName>
    </ButtonsListItem>
  )
}

export default ButtonsTab
