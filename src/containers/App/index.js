import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import styles from './styles'
import Taskboard from '../Taskboard';
import theme from '../../common/Theme'
class App extends Component {

  render() {
    console.log('props:', this.props)
    return (
      <ThemeProvider theme={theme}>
        <h1>Redux saga</h1>
        <Taskboard />
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
