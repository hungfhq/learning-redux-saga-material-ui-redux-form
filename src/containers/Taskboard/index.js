import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import styles from './styles'
import { STATUSES } from '../../constants/index';
import Grid from '@material-ui/core/Grid'

import TaskList from '../../components/TaskList'


const listTask = [
  {
    id: 1,
    title: "read book",
    description: 'read material ui book',
    status: 0
  },
  {
    id: 2,
    title: "play football",
    description: 'with my friend',
    status: 2
  },
  {
    id: 3,
    title: "play game",
    description: 'play station',
    status: 1
  },
]

class Taskboard extends Component {
  state = {
    open: false
  }
  renderBoard() {
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
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter name of new task
              </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
              </Button>
          <Button onClick={this.handleClose} color="primary">
            Add
              </Button>
        </DialogActions>
      </Dialog>
    )

    return xhtml;
  }


  render() {
    return (
      <>
        <Button variant='contained' color='secondary' onClick={this.openForm}>
          <AddIcon />
        </Button>
        {this.renderBoard()}
        {this.renderForm()}
      </>
    );
  }
}

export default withStyles(styles)(Taskboard);
