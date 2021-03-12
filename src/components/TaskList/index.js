import React, { Component } from 'react'
import TaskItem from '../TaskItem'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { withStyles } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'

class TaskList extends Component {
  render() {
    const { classes, tasks, status, key, editTask } = this.props
    return (
      <Grid item md={4} sm={4} xs={12} key={key}>
        <div className={classes.status}>
          <Box mt={2} mb={2}>
            <div className={classes.status}>{status.label}</div>
          </Box>
        </div>
        <div className={classes.wrapperListTask}>
          {
            tasks.map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  status={status}
                  classes={classes}
                  editTask={() => editTask(task)}
                />
              )
            })
          }
        </div>
      </Grid>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array,
  status: PropTypes.object,
  key: PropTypes.number,
  editTask: PropTypes.func
}

export default withStyles(styles)(TaskList)
