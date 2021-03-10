import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

class TaskForm extends Component {
  render() {
    const { classes } = this.props
    return (
      <form>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box display='flex' flexDirection='row-reverse' justifyContent='space-around'>
              <Button variant='contained' color='primary'>Save</Button>
              <Button variant='contained' color='secondary'>Cancel</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    )
  }
}

TaskForm.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
}

// const mapStateToProps = state => {
//   return {
//     open: state.modal.showModal,
//     component: state.modal.component,
//     title: state.modal.title,
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     modalActionCreators: bindActionCreators(modalActions, dispatch)
//   }
// }

// const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles(styles)(TaskForm)

