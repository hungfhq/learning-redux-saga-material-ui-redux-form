import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import styles from './styles'
import TaskBoard from '../TaskBoard'
import theme from '../../commons/Theme'
import { Provider } from 'react-redux'
import configureStore from '../../redux/configureStore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalLoading from '../../components/GlobalLoading';
import AppModal from '../../components/AppModal';

const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <AppModal />
          <TaskBoard />
          <GlobalLoading />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
