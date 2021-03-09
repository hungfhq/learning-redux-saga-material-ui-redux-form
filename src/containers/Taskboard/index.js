import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { STATUSES } from '../../constants/index';
import Grid from '@material-ui/core/Grid'

import TaskList from '../../components/TaskList'
import TaskForm from '../../components/TaskForm'
import SearchBox from '../../components/SearchBox'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as taskActions from '../../actions/task'
import PropTypes from 'prop-types';

// const listTask = [
//   {
//     id: 1,
//     title: "read book",
//     description: 'read material ui book',
//     status: 0
//   },
//   {
//     id: 2,
//     title: "play football",
//     description: 'with my friend',
//     status: 2
//   },
//   {
//     id: 3,
//     title: "play game",
//     description: 'play station',
//     status: 1
//   },
// ]

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
    console.log(this.props)
    const { listTask } = this.props
    let xhtml = null;
    xhtml = (<Grid container spacing={2}>
      {
        STATUSES.map((status) => {
          const taskFiltered = listTask.filter(task => task.status === status.value)
          return (
            <TaskList key={status.value} tasks={taskFiltered} status={status} />
          )
        })
      }
    </Grid>)

    return xhtml;
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  openForm = () => {
    this.setState({
      open: true
    })
  }

  renderForm() {
    let xhtml = null;
    const { open } = this.state;
    xhtml = (
      <TaskForm open={open} handleClose={this.handleClose} />
    )

    return xhtml;
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
        {this.renderForm()}
      </>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
  }),
  listTask: PropTypes.array
}

const mapStateToProps = state => {
  return {
    listTask: state.task.listTask
  }
}
const mapDispatchToProps = dispatch => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch)
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard));
