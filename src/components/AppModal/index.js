import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modal'
import CloseIcon from '@material-ui/icons/Clear'

class AppModal extends Component {
  render() {
    const { open, classes, title, component, modalActionCreators } = this.props
    const { hideModal } = modalActionCreators
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
            <CloseIcon className={classes.icon} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    )
  }
}

AppModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  component: PropTypes.object,
  title: PropTypes.string,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
}

const mapStateToProps = state => {
  return {
    open: state.modal.showModal,
    component: state.modal.component,
    title: state.modal.title,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    modalActionCreators: bindActionCreators(modalActions, dispatch)
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withStyles(styles),
  withConnect
)(AppModal)

