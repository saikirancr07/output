import {ListItem, Task, TaskPara} from './styledComponents'

const ShowTasks = props => {
  const {details, result} = props
  let ClassName
  if (result === 'true') {
    ClassName = Task
  } else {
    ClassName = TaskPara
  }
  return (
    <ListItem>
      <ClassName>{details}</ClassName>
    </ListItem>
  )
}

export default ShowTasks
