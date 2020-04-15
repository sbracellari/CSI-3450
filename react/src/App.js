// import necessary packages
import React, { Component } from 'react'

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
  review_transaction,
  get_transaction_history,
  modify_customer,
  create_bank_account,
  delete_account
} from './api/api'

// declare state variables 
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
    approved: -1,
    transaction_history: [],
    weekly_spending: [],
    balances: [],
    pending_transactions: [],
    customers: [],
    accounts: [],
    account_num: 0,
    transaction_error: false,
    acc_err: false,
    snackbar: false,
    debit_card_usage: 0,
    amt_err: false,
    input_first_name: '',
    input_last_name: '',
    input_area_code: 0,
    input_phone: 0,
    input_email: '',
    input_password: '',
    user_id: 0,
    modify_err: false,
    disabled: true,
    accSnackbar: false,
    customerSnackbar: false,
    deleteSnackbar: false,
    delete_err: false,
    dialogOpen: false
  }

  // set admin state to true and user state to false if the
  // administrator button is clicked on the welcome page 
  setAdmin = () => {
    this.setState({ is_admin: true, is_user: false })
  }

  // set admin state to false and user state to true if the 
  // customer button is clicked on the welcome page
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

  handleAccSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ 
      accSnackbar: false
    })
  }

  handleCustomerSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ 
      customerSnackbar: false
    })
  }

  handleDeleteSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ 
      deleteSnackbar: false
    })
  }

   // when the admin clicks the edit button, state variables will be set to 
  // what is initially shown on the screen
  onEdit = i => {
    this.setState({
      user_id: this.state.customers[i].USER_ID,
      input_first_name: this.state.customers[i].USER_FNAME,
      input_last_name: this.state.customers[i].USER_LNAME,
      input_area_code: this.state.customers[i].USER_AREACODE,
      input_phone: this.state.customers[i].USER_PHONE,
      input_email: this.state.customers[i].USER_EMAIL,
      input_password: this.state.customers[i].USER_PASS,
      disabled: false
    })
  }

  // when an admin saves their changes, this method will be called, which calls the
  // modify_customer method in api.js with the 7 variables below
  onCustomerChange = () => {
      modify_customer(
        this.state.user_id,
        this.state.input_first_name,
        this.state.input_last_name,
        this.state.input_area_code,
        this.state.input_phone,
        this.state.input_email,
        this.state.input_password
    ).then(data => {
      this.setState({ 
        modify_err: data.CUSTOMERS.length === 0, 
        customerSnackbar: true, 
        disabled: true,
        customers: data.CUSTOMERS
      })
    })
  }

  // to cancel editing of customers
  onCancel = () => {
    this.setState({ disabled: true })
  }

  // handle textfield input for email (for modify customer)
  handleInputEmail = (event) =>  {
    this.setState({ input_email: event.target.value })
  }

  // handle textfield input for password (for modify customer)
  handleInputPass = (event) => {
    this.setState({ input_password: event.target.value })
  }

  // handle textfield input for first name (for modify customer)
  handleInputFirstName = event => {
    this.setState({ input_first_name: event.target.value })
  }

  // handle textfield input for last name (for modify customer)
  handleInputLastName = event => {
    this.setState({ input_last_name: event.target.value })
  }

  // handle textfield input for area code (for modify customer)
  handleInputAreaCode = event => {
    this.setState({ input_area_code: event.target.value })
  }

  // handle textfield input for phone (for modify customer)
  handleInputPhone = event => {
    this.setState({ input_phone: event.target.value })
  }

  // as long as the transfer amount is not negative, (i.e. the
  // amt_err is true), this will call the transfer method in api.js with
  // values of account from, account to, and amount, and, once the 
  // request returns, will set the transaction error to the opposite of the 
  // fetch request response (the fetch request returns a boolean)
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

  // as long as the withdraw amount is not negative, (i.e. the
  // amt_err is true), this will call the withdraw method in api.js with
  // values of account from and amount, and, once the 
  // request returns, will set the transaction error to the opposite of the 
  // fetch request response (the fetch request returns a boolean)
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

  // as long as the deposit amount is not negative, (i.e. the
  // amt_err is true), this will call the deposit method in api.js with
  // values of account from, account to, and amount, and, once the 
  // request returns, will set the transaction error to the opposite of the 
  // fetch request response (the fetch request returns a boolean)
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

  // is called when a user hits the login button.
  // will call the login method in the api.js with the email
  onLogin = () => {
    login(this.state.email).then((data) => {
      // setting password and user ID to data in the fetch response
      let password = data[0].USER_PASS
      let user_id = data[0].USER_ID

      // checking that the returned password is the same as the entered password.
      // if they are the same, the user is logged in and directed to their 
      // respective home page (administrator or customer)
      if (this.state.password === password) {
        this.setState({
          logged_in: true,
          login_err: false
        })

        // upon successful login, the user's ID is saved in local storage for the
        // backend to read and use later
        localStorage.setItem('user_id', user_id)

        // if the user is an administrator, call the get_admin_details method
        // in api.js which will retrieve the admin's 2 core pieces of information - 
        // their managed customers and their pending transactions
        if (this.state.is_admin) {
          get_admin_details().then((admin_data) => {
            this.setState({ 
              pending_transactions: admin_data.PENDING_TRANSACTIONS,
              customers: admin_data.CUSTOMERS,
            })
          })
        } else { 
          // if the user is a customer, call the get_user_details method in 
          // api.js, which will retieve 4 of the 5 core pieces of the user's information - 
          // their accounts, weekly transactions for their checking account, their account
          // balances, and their debit card usage for their checking account
          get_user_details().then((user_data) => {
            this.setState({ 
              accounts: user_data.ACCOUNTS,
              weekly_spending: user_data.WEEKLY_TRANSACTIONS,
              balances: user_data.BALANCES,
              debit_card_usage: user_data.DEBIT_CARD_USAGE.DEBIT
            })
          })
        }

        // if the password does not match, do not log them in. instead, set the login error to
        // true, which will notify them that either their email or password was incorrect
      } else {
        this.setState({ login_err: true })
      }
    })
  }

  // when either the customer or the administrator hits the logout button, log them out
  // and delete their user ID from local storage
  onLogout = () => {
    this.setState({
      logged_in: false,
      is_admin: false,
      is_user: false
    })

    localStorage.removeItem("user_id")
  }

  // when the customer creates a new SYB Bank account, call the register method in api.js with
  // first name, last name, area code, phone, email and password. the fetch request will return
  // true upon successful registration and the user will be redirected to the login page, and
  // false otherwise
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

  // handle textfield input for email (for user registration)
  handleEmail = (event) =>  {
    this.setState({ email: event.target.value })
  }

  // handle textfield input for password (for user registration)
  handlePass = (event) => {
    this.setState({ password: event.target.value })
  }

  // handle textfield input for first name (for user registration)
  handleFirstName = event => {
    this.setState({ first_name: event.target.value })
  }

  // handle textfield input for last name (for user registration)
  handleLastName = event => {
    this.setState({ last_name: event.target.value })
  }

  // handle textfield input for area code (for user registation)
  handleAreaCode = event => {
    this.setState({ area_code: event.target.value })
  }

  // handle textfield input for phone (for user registration)
  handlePhone = event => {
    this.setState({ phone: event.target.value })
  }

  // handle dropdown input for source account (for transactions)
  handleAccFrom = event => {
    this.setState({ acc_from: event.target.value })
  }

  // handle dropdown input for target account (for transactions)
  handleAccTo = event => {
    this.setState({ acc_to: event.target.value })
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  }

  handleDialog = () => {
    this.setState({ dialogOpen: true })
  }

  // handle textfield input for amount (for transactions)
  handleAmt = event => {
    // check if the first character of the transaction amount is a '-', i.e.,
    // the amount is negative. if it is, set the amount error to true
    if (event.target.value.charAt(0) === '-') {
      this.setState({ amt_err: true })
    } else {
      this.setState({ 
        amount: event.target.value,
        amt_err: false
      })
    }
  }

  // handle textfield input for amount (for bank account creation)
  handleStartingBalance = event => {
    // check if the first character of the transaction amount is a '-', i.e.,
    // the amount is negative. if it is, set the amount error to true
    if (event.target.value.charAt(0) === '-') {
      this.setState({ amt_err: true })
    } else {
      this.setState({ 
        starting_balance: event.target.value,
        amt_err: false
      })
    }
  }

  // on bank account creation, will check if the starting balance is negative. if its not,
  // it will call the create_bank_account method in api.js with the account type and starting
  // balance. if the starting balance is negative, the user will not be able to create the account
  createBankAccount = () => {
    if (this.state.acc_type === '3' && this.state.starting_balance < 5000) {
        this.setState({ 
          acc_err: true,
          accSnackbar: true
        })
      return
    }
      
    if (!this.state.amt_err) {
      create_bank_account(
      this.state.acc_type,
      this.state.starting_balance
    ).then(data => {
      this.setState({ 
        acc_err: data.length === 0,
        accSnackbar: true,
        accounts: data.ACCOUNTS,
        balances: data.BALANCES
       })
    })
    }
  }

  // on account deletion, the delete_account method will be called in api.js
  // with the account number
  onAccountDelete = () => {
    delete_account(this.state.account_num).then(data => {

      // if data === 0, the account is a checking and cannot be deleted
      if (data === 0) {
        this.setState({ 
          delete_err: true,
          deleteSnackbar: true,
          dialogOpen: false
        })

        return
      }

      // this only runs when the account is a savings or money market
      this.setState({ 
        delete_err: false,
        deleteSnackbar: true,
        dialogOpen: false,
        accounts: data.ACCOUNTS,
        balances: data.BALANCES
       })
    })
  }

  // get account type value from drop down (for create bank account)
  handleAccType = event => {
    this.setState({ acc_type: event.target.value })
  }

  // when a transaction is approved, set the approved value to 1, and call the review_transaction
  // method in api.js
  onApprove = i => {

    const approved = 1

    review_transaction(
      this.state.pending_transactions[i].TRANS_ID, 
      approved
    ).then(data => {
      // a new list of the pending transactions will be returned
      this.setState({ pending_transactions: data.PENDING_TRANSACTIONS })
    })
  }
  
  // handle dropdown input for accounts (when viewing transaction history or 
  // choosing source/target accounts for transactions)
  handleAccChange = event => {
    this.setState({ account_num: event.target.value })

    // on each change call the get_transaction_history method in api.js which 
    // returns the transaction history for that account
    get_transaction_history(event.target.value).then(data => {
      this.setState({ transaction_history: data.TRANSACTION_HISTORY })
    })
  }

  // when a transaction is denied, set the approved value to 0, and call the review_transaction 
  // method in api.js
  onDeny = i => {
    
    const approved = 0

    review_transaction(
      this.state.pending_transactions[i].TRANS_ID, 
      approved
    ).then(data => {
      // a new list of the pending transactions will be returned
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
      amt_err,
      disabled,
      acc_err,
      starting_balance,
      accSnackbar,
      customerSnackbar,
      deleteSnackbar,
      dialogOpen,
      delete_err
    } = this.state

    return (
      <div>
        <Router>
          <Route
            // rende the admin headers only on the admin pages
            render={props => (props.location.pathname === '/admin/home'
            || props.location.pathname === '/admin/my-customers'
            || props.location.pathname === '/admin/pending-transactions')
            && <AdminHeader 
                // pass necessary methods
                 onLogout={this.onLogout}
               /> 
            }
          />  
          <Route
            // render the user header only on the user pages
            render={props => (props.location.pathname === '/user/home'
            || props.location.pathname === '/user/initiate-transaction'
            || props.location.pathname === '/user/transaction-history'
            || props.location.pathname === '/user/weekly-spending'
            || props.location.pathname === '/user/create-bank-account')
            && <UserHeader
                 // pass necessary methods
                 onLogout={this.onLogout}
              /> 
            }
          />
          <Route 
            // render the footer on all pages except on welcome, login, and register
            render={props => props.location.pathname !== '/' 
            && props.location.pathname !== '/login'
            && props.location.pathname !== '/register'
            && <Footer />}
          />
          <Route 
            // render the welcome page only for the '/' path
            exact path='/' 
            render={() => (
              <Welcome 
                // pass necessary methods and state variables
                setAdmin={this.setAdmin}
                setUser={this.setUser}
                is_admin={is_admin}
                is_user={is_user}
                logged_in={logged_in}
              />
            )}  
          />
          <Route 
            // render the login page only for the '/login' path
            exact path='/login' 
            render={() => (
              <Login 
                // pass necessary methods and state variables
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
            // render the register page only for the '/register' path
            exact path='/register' 
            render={() => (
              <Register 
                // pass necessary methods and state variables
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
            // render the admin home page only for the '/admin/home' path
            exact path='/admin/home' 
            render={() => (
              <AdminHome 
              // pass necessary state variables
               pending_transactions={pending_transactions}
               customers={customers}
               logged_in={logged_in}
              />
            )} 
          />
          <Route 
            // render the user home page only for the '/user/home' path
            exact path='/user/home' 
            render={() => (
              <UserHome
                // pass necessary state variables 
                transaction_history={transaction_history}
                weekly_spending={weekly_spending}
                logged_in={logged_in}
                balances={balances}
                debit_card_usage={debit_card_usage}
              />
            )}
          />
          <Route 
            // render the customers page only for the '/admin/my-customers' path
            exact path='/admin/my-customers' 
            render={() => (
              <MyCustomers 
                // pass necessary state variables
                logged_in={logged_in}
                customers={customers}
                handleInputAreaCode={this.handleInputAreaCode}
                handleInputEmail={this.handleInputEmail}
                handleInputFirstName={this.handleInputFirstName}
                handleInputPass={this.handleInputPass}
                handleInputLastName={this.handleInputLastName}
                handleInputPhone={this.handleInputPhone}
                onEdit={this.onEdit}
                onCustomerChange={this.onCustomerChange}
                onCancel={this.onCancel}
                disabled={disabled}
                handleCustomerSnackbarClose={this.handleCustomerSnackbarClose}
                customerSnackbar={customerSnackbar}
              />
            )}
          />
          <Route 
            // render the pending transactions page for the '/admin/pending-transactions' path
            exact path='/admin/pending-transactions' 
            render={() => (
              <PendingTransactions 
                // pass necessary methods and state variables
                logged_in={logged_in}
                pending_transactions={pending_transactions}
                onApprove={this.onApprove}
                onDeny={this.onDeny}
              />
            )}
          />
          <Route 
            // render the transactions page for the '/user/initiate-transaction' path
            exact path='/user/initiate-transaction' 
            render={() => (
              <InitiateTransaction 
                // pass necessary methods and state variables
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
            // render the transaction history page only for the '/user/transaction-history' path
            exact path='/user/transaction-history' 
            render={() => (
              <TransactionHistory 
                // pass necessary methods and state variables
                transaction_history={transaction_history}
                logged_in={logged_in}
                accounts={accounts}
                account_num={account_num}
                handleAccChange={this.handleAccChange}
                deleteSnackbar={deleteSnackbar}
                handleDeleteSnackbarClose={this.handleDeleteSnackbarClose}
                onAccountDelete={this.onAccountDelete}
                dialogOpen={dialogOpen}
                handleDialogClose={this.handleDialogClose}
                handleDialog={this.handleDialog}
                delete_err={delete_err}
              />
            )}
          />
          <Route 
            // render the weekly spending page only for the '/user/weekly-spending' path
            exact path='/user/weekly-spending' 
            render={() => (
              <WeeklySpending
                // pass necessary state variables
                weekly_spending={weekly_spending}
                logged_in={logged_in}
              />
            )}
          />
          <Route 
            // render the create bank account page only for the '/user/create-bank-account' path
            exact path='/user/create-bank-account' 
            render={() => (
              <CreateBankAccount 
                // pass necessary methods and state variables
                logged_in={logged_in}
                handleStartingBalance={this.handleStartingBalance}
                handleAccSnackbarClose={this.handleAccSnackbarClose}
                acc_err={acc_err}
                createBankAccount={this.createBankAccount}
                starting_balance={starting_balance}
                handleAccType={this.handleAccType}
                accSnackbar={accSnackbar}
              />
            )}
          />
        </Router>
      </div>
    )
  }
}

export default App