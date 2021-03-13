import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modal'
import * as taskActions from '../../actions/task'

class ConfirmBox extends Component {
  render() {
    const { modalActionCreators, taskActionCreators } = this.props
    const { hideModal } = modalActionCreators
    const { removeTask } = taskActionCreators
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <h4>Are you sure?</h4>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box display='flex' flexDirection='row-reverse' justifyContent='space-around'>
            <Button variant='contained' color='primary' type='submit' onClick={removeTask}>Yes</Button>
            <Button variant='contained' color='secondary' onClick={hideModal}>Cancel</Button>
          </Box>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps = state => {
  return {
    taskEditing: state.task.taskEditing,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    modalActionCreators: bindActionCreators(modalActions, dispatch),
    taskActionCreators: bindActionCreators(taskActions, dispatch),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(ConfirmBox)
