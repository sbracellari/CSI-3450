import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import {
  BrowserRouter as Router,
  Route
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
  delete_account,
  get_transaction_history
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
    approved: 0,
    transaction_history: [],
    weekly_spending: [],
    balances: [],
    pending_transactions: [],
    customers: [],
    accounts: [],
    account_num: 0,
    input_first_name: '',
    input_last_name: '',
    input_area_code: '',
    input_phone: '',
    input_email: '',
    input_password: '',
    transaction_error: false,
    acc_err: false,
    snackbar: false,
    debit_card_usage: 0,
    amt_err: false
  }

  setAdmin = () => {
    this.setState({ is_admin: true, is_user: false })
  }

  setUser = () => {
    this.setState({ is_user: true, is_admin: false })
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ 
      snackbar: false
    })
  }

  onTransfer = () => {
    if (!this.state.amt_err) {
      transfer(
      this.state.acc_from,
      this.state.acc_to,
      this.state.amount
    ).then(data => {
      this.setState({ 
        transaction_error: !data,
        snackbar: true
      })
    })
    }
  }

  onWithdraw = () => {
    if (!this.state.amt_err) {
    withdraw(
      this.state.acc_from,
      this.state.amount
    ).then(data => {
      this.setState({ 
        transaction_error: !data,
        snackbar: true
      })
    })
    }
    
  }

  onDeposit = () => {
    if (!this.state.amt_err) {
    deposit(
      this.state.acc_to,
      this.state.amount
    ).then(data => {
      this.setState({ 
        transaction_error: !data,
        snackbar: true
      })
    })
    }
    
  }

  onLogin = () => {
    login(this.state.email).then((data) => {
      let password = data[0].USER_PASS
      let user_id = data[0].USER_ID

      if (this.state.password === password) {
        this.setState({
          logged_in: true,
          login_err: false
        })

        localStorage.setItem('user_id', user_id)

        if (this.state.is_admin) {
          get_admin_details().then((admin_data) => {
            this.setState({ 
              pending_transactions: admin_data.PENDING_TRANSACTIONS,
              customers: admin_data.CUSTOMERS,
            })
          })
        } else {
          get_user_details().then((user_data) => {
            this.setState({ 
              accounts: user_data.ACCOUNTS,
              weekly_spending: user_data.WEEKLY_TRANSACTIONS,
              balances: user_data.BALANCES,
              debit_card_usage: user_data.DEBIT_CARD_USAGE.DEBIT
            })
          })
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

    localStorage.removeItem("user_id")
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
        register_err: false,
        is_user: true,
        is_admin: false
      })
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

  handleAccFrom = event => {
    this.setState({ acc_from: event.target.value })
  }

  handleAccTo = event => {
    this.setState({ acc_to: event.target.value })
  }

  handleAmt = event => {
    if (event.target.value.charAt(0) === '-') {
      this.setState({ amt_err: true })
    } else {
      this.setState({ 
        amount: event.target.value,
        amt_err: false
      })
    }
  }

  onApprove = (i) => {
    this.setState({ approved: 1 })

    review_transaction(
      this.state.pending_transactions[i].TRANS_ID, 
      this.state.approved
    ).then(data => {
      
      this.setState({ pending_transactions: data.PENDING_TRANSACTIONS })
    })
  }
  
  handleAccChange = event => {
    this.setState({ account_num: event.target.value })


    get_transaction_history(event.target.value).then(data => {
      this.setState({ transaction_history: data.TRANSACTION_HISTORY })
    })
  }

  onDeny = (i) => {
    this.setState({ approved: 0 })

    review_transaction(
      this.state.pending_transactions[i].TRANS_ID, 
      this.state.approved).then(data => {
      
      this.setState({ pending_transactions: data.PENDING_TRANSACTIONS })
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
      acc_from,
      acc_to,
      amount,
      pending_transactions,
      customers,
      transaction_history,
      weekly_spending,
      balances,
      accounts,
      account_num,
      register_err,
      transaction_error,
      snackbar,
      debit_card_usage,
      amt_err
    } = this.state

    return (
      <div>
        <Router>
          <Route
            render={props => (props.location.pathname === '/admin/home'
            || props.location.pathname === '/admin/my-customers'
            || props.location.pathname === '/admin/pending-transactions')
            && <AdminHeader 
                 onLogout={this.onLogout}
               /> 
            }
          />  
          <Route
            render={props => (props.location.pathname === '/user/home'
            || props.location.pathname === '/user/initiate-transaction'
            || props.location.pathname === '/user/transaction-history'
            || props.location.pathname === '/user/weekly-spending'
            || props.location.pathname === '/user/create-bank-account')
            && <UserHeader
                 onLogout={this.onLogout}
              /> 
            }
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
                is_admin={is_admin}
                is_user={is_user}
                logged_in={logged_in}
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
                register_err={register_err}
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
                balances={balances}
                debit_card_usage={debit_card_usage}
              />
            )}
          />
          <Route 
            exact path='/admin/my-customers' 
            render={() => (
              <MyCustomers 
                logged_in={logged_in}
                customers={customers}
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
                accounts={accounts}
                transaction_error={transaction_error}
                snackbar={snackbar}
                handleSnackbarClose={this.handleSnackbarClose}
                amt_err={amt_err}
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
                accounts={accounts}
                account_num={account_num}
                handleAccChange={this.handleAccChange}
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