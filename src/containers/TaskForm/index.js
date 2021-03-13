import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modal'
import * as taskActions from '../../actions/task'
import { reduxForm, Field } from 'redux-form'
import renderTextField from '../../components/FormHelper/TextField'
import validate from './validate'

class TaskForm extends Component {
  handleSubmitForm = data => {
    const { taskActionCreators } = this.props
    const { addTask } = taskActionCreators
    const { title, description } = data
    addTask(title, description)
  }

  required = value => {
    let error = 'enter text'
    if (value !== null && typeof value !== 'undefined' && value.trim() !== '') {
      error = null
    }
    return error
  }

  minLength = value => {
    let error = 'minimum 10 characters'
    if (value !== null && typeof value !== 'undefined' && value.trim().length > 10) {
      error = null
    }
    return error
  }

  render() {
    const { classes, modalActionCreators, handleSubmit, submitting, invalid, taskEditing } = this.props
    const { hideModal } = modalActionCreators
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
            /> */}
            <Field
              id='title'
              name='title'
              label='Title'
              className={classes.textField}
              component={renderTextField}
              autoFocus
            // validate={[this.required, this.minLength]}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {/* <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
            /> */}
            <Field
              id='description'
              name='description'
              label='Description'
              multiline
              rowsMax='4'
              margin='normal'
              className={classes.textField}
              component={renderTextField}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box display='flex' flexDirection='row-reverse' justifyContent='space-around'>
              <Button variant='contained' color='primary' type='submit' disabled={invalid || submitting} > Save</Button>
              <Button variant='contained' color='secondary' onClick={hideModal}>Cancel</Button>
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
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  taskActionCreators: PropTypes.shape({
    addTask: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  taskEditing: PropTypes.object
}

const mapStateToProps = state => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: {
      title: state.task.taskEditing ? state.task.taskEditing.title : '',
      description: state.task.taskEditing ? state.task.taskEditing.description : '',
    },
  }
}
const mapDispatchToProps = dispatch => {
  return {
    modalActionCreators: bindActionCreators(modalActions, dispatch),
    taskActionCreators: bindActionCreators(taskActions, dispatch)
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const FORM_NAME = 'TASK_MANAGEMENT'
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate
})

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm)

