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

import { 
  login, 
  register, 
  get_user_details,
  get_admin_details,
  transfer,
  withdraw,
  deposit,
  create_bank_account,
  modify_customer,
  review_transaction,
  delete_account
} from './api/api'

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
    phone: 0,
    acc_from: 0,
    acc_to: 0,
    amount: 0,
    acc_type: 0,
    starting_balance: 0,
    transaction_id: 0,
    approved: false,
    transaction_history: [],
    weekly_spending: [],
    balances: [],
    pending_transactions: [],
    customers: []
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

  onTransfer = () => {
    transfer(
      this.state.acc_from,
      this.state.acc_to,
      this.state.amount
    )
  }

  onWithdraw = () => {
    withdraw(
      this.state.acc_from,
      this.state.amount
    )
  }

  onDeposit = () => {
    deposit(
      this.state.acc_to,
      this.state.amount
    )
  }

  onAccountDelete = () => {
    delete_account(this.state.transaction_history.account_number)
  }

  createBankAccount = () => {
    create_bank_account(
      this.state.acc_type,
      this.state.starting_balance
    )
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
          get_admin_details().then((admin_data) => {
            this.setState({ 
              pending_transactions: admin_data.pending_transactions,
              customers: admin_data.customers 
            })
          })
          return <Redirect to='/admin/home' />
        } else {
          get_user_details().then((user_data) => {
            this.setState({ 
              transaction_history: user_data.transaction_history,
              weekly_spending: user_data.weekly_spending,
              balances: user_data.balances 
            })
          })
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

  onCustomerChange = () => {
    modify_customer(
      this.state.first_name,
      this.state.last_name, 
      this.state.area_code,
      this.state.phone,
      this.state.email,
      this.state.password
    )
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

  handleAccFrom = event => {
    this.setState({ acc_from: event.target.value })
  }

  handleAccTo = event => {
    this.setState({ acc_to: event.target.value })
  }

  handleAmt = event => {
    this.setState({ amount: event.target.value })
  }

  handleAccType = event => {
    this.setState({ acc_type: event.target.value })
  }

  handleStartingBalance = event => {
    this.setState({ starting_balance: event.target.value })
  }

  onApprove = (i) => {
    this.setState({ approved: true })

    review_transaction(
      this.state.pending_transactions[i].transaction_id, 
      this.state.approved
    ).then(data => {
      
      this.setState({ pending_transactions: data })
    })
  }

  onDeny = (i) => {
    this.setState({ approved: false })

    review_transaction(
      this.state.pending_transactions[i].transaction_id, 
      this.state.approved).then(data => {
      
      this.setState({ pending_transactions: data })
    })
  }

  render() {
    const {
      is_admin,
      is_user,
      logged_in,
      email, 
      password,
      login_err,
      first_name,
      last_name,
      area_code,
      phone,
      acc_from,
      acc_to,
      amount,
      pending_transactions,
      customers,
      transaction_history,
      weekly_spending,
      balances
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
          <Route 
            exact path='/register' 
            render={() => (
              <Register 
                handleFirstName={this.handleFirstName}
                handleLastName={this.handleLastName}
                handleAreaCode={this.handleAreaCode}
                handlePhone={this.handlePhone}
                handleEmail={this.handleEmail}
                handlePass={this.handlePass}
                onRegister={this.onRegister}
              />
            )}
          />
          <Route 
            exact path='/admin/home' 
            render={() => (
              <AdminHome 
               pending_transactions={pending_transactions}
               customers={customers}
               logged_in={logged_in}
              />
            )} 
          />
          <Route 
            exact path='/user/home' 
            render={() => (
              <UserHome 
                transaction_history={transaction_history}
                weekly_spending={weekly_spending}
                logged_in={logged_in}
              />
            )}
          />
          <Route 
            exact path='/admin/my-customers' 
            render={() => (
              <MyCustomers 
                first_name={first_name}
                last_name={last_name}
                area_code={area_code}
                phone={phone}
                email={email}
                password={password}
                logged_in={logged_in}
                onCustomerChange={this.onCustomerChange}
              />
            )}
          />
          <Route 
            exact path='/admin/pending-transactions' 
            render={() => (
              <PendingTransactions 
                logged_in={logged_in}
                pending_transactions={pending_transactions}
                onApprove={this.onApprove}
                onDeny={this.onDeny}
                logged_in={logged_in}
              />
            )}
          />
          <Route 
            exact path='/user/initiate-transaction' 
            render={() => (
              <InitiateTransaction 
                acc_from={acc_from}
                acc_to={acc_to}
                amount={amount}
                onTransfer={this.onTransfer}
                onWithdraw={this.onWithdraw}
                onDeposit={this.onDeposit}
                logged_in={logged_in}
                handleAccFrom={this.handleAccFrom}
                handleAccTo={this.handleAccTo}
                handleAmt={this.handleAmt}
              />
            )}
          />
          <Route 
            exact path='/user/transaction-history' 
            render={() => (
              <TransactionHistory 
                transaction_history={transaction_history}
                logged_in={logged_in}
                onAccountDelete={this.onAccountDelete}
              />
            )}
          />
          <Route 
            exact path='/user/weekly-spending' 
            render={() => (
              <WeeklySpending
                weekly_spending={weekly_spending}
                logged_in={logged_in}
              />
            )}
          />
          <Route 
            exact path='/user/create-bank-account' 
            render={() => (
              <CreateBankAccount 
                handleAccType={this.handleAccType}
                handleStartingBalance={this.handleStartingBalance}
                createBankAccount={this.createBankAccount}
                logged_in={logged_in}
              />
            )}
          />
        </Router>
      </div>
    )
  }
}

export default withStyles(styles)(App)