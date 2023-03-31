import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import ShowTasks from '../ShowTasks'
import ButtonsTab from '../ButtonsTab'
import {
  HomeBgContainer,
  LeftContainer,
  Heading,
  Form,
  Label,
  Input,
  Select,
  AddButton,
  RightContainer,
  ButtonsListContainer,
  SubHeading,
  FailureContainer,
  TasksListContainer,
  Para,
  BothListContainers,
} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Home extends Component {
  state = {
    initialTasksList: [],
    isActive: false,
    textInput: '',
    select: tagsList[0].optionId,
    activeTab: '',
  }

  clickTheAddButton = event => {
    event.preventDefault()
    const {textInput, select, initialTasksList} = this.state
    if (textInput !== '' && select !== '') {
      const data = {id: uuidv4(), textInput, select}
      const updatedData = [...initialTasksList, data]

      this.setState({
        initialTasksList: updatedData,
        textInput: '',
        select: tagsList[0].optionId,
      })
    }
  }

  changeTheSelectOption = event => {
    this.setState({select: event.target.value})
  }

  changeTheTextInput = event => {
    this.setState({textInput: event.target.value})
  }

  getTheTabItem = item => {
    console.log(item)
    const {activeTab} = this.state
    if (activeTab === item) {
      this.setState({isActive: false, activeTab: ''})
    } else {
      this.setState({isActive: true, activeTab: item})
    }
  }

  renderFilterList = () => {
    const {activeTab, initialTasksList} = this.state
    const updatedData = initialTasksList.filter(
      eachItem => eachItem.select === activeTab,
    )

    const dataLength = updatedData.length > 0

    if (dataLength) {
      return (
        <BothListContainers>
          <TasksListContainer>
            {updatedData.map(eachItem => (
              <ShowTasks
                details={eachItem.textInput}
                result="true"
                key={eachItem.id}
              />
            ))}
          </TasksListContainer>
          <TasksListContainer>
            {updatedData.map(eachItem => (
              <ShowTasks
                details={eachItem.select}
                result="false"
                key={eachItem.id}
              />
            ))}
          </TasksListContainer>
        </BothListContainers>
      )
    }
    return this.renderFailureView()
  }

  renderFailureView = () => (
    <FailureContainer>
      <Para>No Tasks Added Yet</Para>
    </FailureContainer>
  )

  renderInitialList = () => {
    const {initialTasksList} = this.state
    const isLength = initialTasksList.length > 0
    if (isLength) {
      return (
        <BothListContainers>
          <TasksListContainer>
            {initialTasksList.map(eachItem => (
              <ShowTasks
                details={eachItem.textInput}
                result="true"
                key={eachItem.id}
              />
            ))}
          </TasksListContainer>
          <TasksListContainer>
            {initialTasksList.map(eachItem => (
              <ShowTasks
                details={eachItem.select}
                result="false"
                key={eachItem.id}
              />
            ))}
          </TasksListContainer>
        </BothListContainers>
      )
    }
    return this.renderFailureView()
  }

  render() {
    const {isActive, textInput, select, activeTab} = this.state
    return (
      <HomeBgContainer>
        <LeftContainer>
          <Heading>Create a task!</Heading>
          <Form onSubmit={this.clickTheAddButton}>
            <Label htmFor="task">Task</Label>
            <Input
              id="task"
              type="text"
              value={textInput}
              placeholder="Enter the task here"
              onChange={this.changeTheTextInput}
            />
            <Label htmlFor="tags">Tags</Label>
            <Select
              id="tags"
              value={select}
              onChange={this.changeTheSelectOption}
            >
              {tagsList.map(eachItem => (
                <option value={eachItem.optionId} key={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </Select>
            <AddButton type="submit">Add Task</AddButton>
          </Form>
        </LeftContainer>
        <RightContainer>
          <SubHeading>Tags</SubHeading>
          <ButtonsListContainer>
            {tagsList.map(eachItem => (
              <ButtonsTab
                key={eachItem.optionId}
                details={eachItem}
                getTheTabItem={this.getTheTabItem}
                active={activeTab === eachItem.optionId}
              />
            ))}
          </ButtonsListContainer>
          <SubHeading>Tasks</SubHeading>
          {isActive ? this.renderFilterList() : this.renderInitialList()}
        </RightContainer>
      </HomeBgContainer>
    )
  }
}

export default Home
