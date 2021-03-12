import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { STATUSES } from '../../constants/index';
import Grid from '@material-ui/core/Grid'

import TaskList from '../../components/TaskList'
import AppModal from '../../components/AppModal'
import SearchBox from '../../components/SearchBox'
import TaskForm from '../TaskForm'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as taskActions from '../../actions/task'
import * as modalActions from '../../actions/modal'
import PropTypes from 'prop-types';


class TaskBoard extends Component {
  state = {
    open: false
  }

  componentDidMount() {
    const { taskActionCreators } = this.props
    const { fetchListTask } = taskActionCreators
    fetchListTask()
  }

  renderBoard() {
    const { listTask } = this.props
    let xhtml = null;
    xhtml = (<Grid container spacing={2}>
      {
        STATUSES.map((status) => {
          const taskFiltered = listTask.filter(task => task.status === status.value)
          return (
            <TaskList
              key={status.value}
              tasks={taskFiltered}
              status={status}
              editTask={this.handleEditTask}
            />
          )
        })
      }
    </Grid>)

    return xhtml;
  }

  openForm = () => {
    const { modalActionCreators, taskActionCreators } = this.props
    const { setTaskEditing } = taskActionCreators
    setTaskEditing(null)
    const { showModal, changeModalTitle, changeModalContent } = modalActionCreators
    showModal()
    changeModalTitle('add new task')
    changeModalContent(<TaskForm />)
  }

  loadData = () => {
    const { taskActionCreators } = this.props
    const { fetchListTask } = taskActionCreators
    fetchListTask()
  }

  handleFilter = (e) => {
    const { value } = e.target
    const { taskActionCreators } = this.props
    const { filterTask } = taskActionCreators
    filterTask(value)
  }

  handleEditTask = task => {
    const { modalActionCreators, taskActionCreators } = this.props
    const { setTaskEditing } = taskActionCreators
    setTaskEditing(task)
    const { showModal, changeModalTitle, changeModalContent } = modalActionCreators
    showModal()
    changeModalTitle('edit task')
    changeModalContent(<TaskForm />)
  }

  renderSearchBox = () => {
    let xhtml = null;
    // const { open } = this.state;
    xhtml = (
      <div>
        <SearchBox handleChange={this.handleFilter} />
      </div>
    )

    return xhtml;
  }


  render() {
    return (
      <>
        <Button variant='contained' color='primary' onClick={this.loadData}>
          Load Data
        </Button>
        <Button variant='contained' color='secondary' onClick={this.openForm}>
          <AddIcon />
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
  }),
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
  listTask: PropTypes.array
}

const mapStateToProps = state => {
  return {
    listTask: state.task.listTask,
    taskEditing: state.task.taskEditing,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard));
