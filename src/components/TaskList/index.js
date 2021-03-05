import React, { Component } from 'react'
import TaskItem from '../TaskItem'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { withStyles } from '@material-ui/core'
import styles from './styles'

class TaskList extends Component {
  render() {
    console.log(this.props)
    const { classes, tasks, status, key } = this.props
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
                <TaskItem key={task.id} task={task} status={status} classes={classes} />
              )
            })
          }
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(TaskList)
