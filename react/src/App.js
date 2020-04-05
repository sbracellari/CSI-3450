import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

import Welcome from './components/Welcome'
import AdminHeader from './components/AdminHeader'
import UserHeader from './components/UserHeader'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import AdminHome from './components/AdminHome'
import UserHome from './components/UserHome'
import MyCustomers from './components/MyCustomers'
import PendingTransactions from './components/PendingTransactions'
import InitiateTransaction from './components/InitiateTransaction'
import TransactionHistory from './components/TransactionHistory'
import WeeklySpending from './components/WeeklySpending'
import CreateBankAccount from './components/CreateBankAccount'

const styles = () => ({

})

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route
            render={props => (props.location.pathname === '/admin/home'
            || props.location.pathname === '/admin/my-customers'
            || props.location.pathname === '/admin/pending-transactions')
            && <AdminHeader /> }
          />  
          <Route
            render={props => (props.location.pathname === '/user/home'
            || props.location.pathname === '/user/initiate-transaction'
            || props.location.pathname === '/user/transaction-history'
            || props.location.pathname === '/user/weekly-spending'
            || props.location.pathname === '/user/create-bank-account')
            && <UserHeader /> }
          />
          <Route 
            render={props => props.location.pathname !== '/' 
            && props.location.pathname !== '/login'
            && props.location.pathname !== '/register'
            && <Footer />}
          />
          <Route exact path='/' component={Welcome} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/admin/home' component={AdminHome} />
          <Route exact path='/user/home' component={UserHome} />
          <Route exact path='/admin/my-customers' component={MyCustomers} />
          <Route exact path='/admin/pending-transactions' component={PendingTransactions} />
          <Route exact path='/user/initiate-transaction' component={InitiateTransaction} />
          <Route exact path='/user/transaction-history' component={TransactionHistory} />
          <Route exact path='/user/weekly-spending' component={WeeklySpending} />
          <Route exact path='/user/create-bank-account' component={CreateBankAccount} />
        </Router>
      </div>
    )
  }
}

export default withStyles(styles)(App)