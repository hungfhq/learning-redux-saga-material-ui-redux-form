import React, { Component } from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types';

class GlobalLoading extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.globalLoading}>
        <p className={classes.loadingText}>loading...</p>
      </div>
    )
  }
}

GlobalLoading.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(GlobalLoading)
