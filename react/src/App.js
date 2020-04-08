import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
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
  state = {
    is_admin: false,
    is_user: false,
    logged_in: false,
    email: '',
    password: '',
    login_err: false,
    first_name: '',
    last_name: '',
    area_code: 0,
    phone: 0
  }

  setAdmin = () => {
    this.setState({ admin: true, user: false })
    console.log("is admin: " + this.state.is_admin)
    console.log("is user: " + this.state.is_user)
  }

  setUser = () => {
    this.setState({ user: true, admin: false })
    console.log("is admin: " + this.state.is_admin)
    console.log("is user: " + this.state.is_user)
  }

  onLogin = () => {
    login(this.state.email).then((data) => {
      let password = data.password

      if (this.state.password === password) {
        this.setState({
          logged_in: true,
          login_err: false
        })

        localStorage.setItem('email', this.state.email)

        if (this.state.is_admin) {
          return <Redirect to='/admin/home' />
        } else {
          return <Redirect to='/user/home' />
        }

      } else {
        this.setState({ login_err: true })
      }
    })
  }

  onLogout = () => {
    this.setState({
      logged_in: false,
      is_admin: false,
      is_user: false
    })

    localStorage.delete("email")
  }

  onRegister = () => {
    register(
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password,
      this.state.area_code,
      this.state.phone
    ).then((data) => {

      if (!data) {
        this.setState({
          logged_in: false,
          register_err: true,
          is_user: false,
          is_admin: false
        })
        return
      }

      this.setState({
        logged_in: true,
        register_err: false,
        is_user: true,
        is_admin: false
      })

      localStorage.setItem('email', this.state.email)
    })
  }

  handleEmail = (event) =>  {
    this.setState({ email: event.target.value })
  }

  handlePass = (event) => {
    this.setState({ password: event.target.value })
  }

  handleFirstName = event => {
    this.setState({ first_name: event.target.value })
  }

  handleLastName = event => {
    this.setState({ last_name: event.target.value })
  }

  handleAreaCode = event => {
    this.setState({ area_code: event.target.value })
  }

  handlePhone = event => {
    this.setState({ phone: event.target.value })
  }

  render() {

    const {
      admin, 
      user
    } = this.state

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
          <Route 
            exact path='/' 
            render={() => (
              <Welcome 
                setAdmin={this.setAdmin}
                setUser={this.setUser}
              />
            )}  
          />
          <Route 
            exact path='/login' 
            render={() => (
              <Login 
                email={email}
                password={password}
                handleEmail={this.handleEmail}
                handlePass={this.handlePass}
                login_err={login_err}
                onLogin={this.onLogin}
                logged_in={logged_in}
                is_admin={is_admin}
                is_user={is_user}
              />
            )}
          />
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