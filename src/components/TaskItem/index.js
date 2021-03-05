import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'

import { withStyles } from '@material-ui/core'
import styles from './styles'


class TaskItem extends Component {
  render() {
    console.log(this.props)
    const { task, status, classes } = this.props
    return (
      <Card key={task.id} className={classes.card}>
        <CardContent>
          <Grid container justify='space-between'>
            <Grid item md={8} sm={8} xs={12}>
              <Typography component='h2'>{task.title}</Typography>
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              {status.label}
            </Grid>
          </Grid>
          <p>{task.description}</p>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Fab color="primary" size='small'>
            <Icon fontSize='small'>
              edit_icon
            </Icon>
          </Fab>
          <Fab color="secondary" size='small'>
            <Icon fontSize='small'>
              delete_icon
            </Icon>
          </Fab>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(TaskItem)