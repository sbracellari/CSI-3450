// import necessary packages
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { Redirect } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'

import { modify_customer } from '../api/api'

// apply styles
const styles = () => ({
  background: {
    backgroundColor: '#232428',
    color: 'white',
    margin: '10px -10px -10px -10px',
    height: '70vh',
    overflowX: 'hidden'
  },
  container: {
    margin: '30px 70px 40px 70px'
  },
  paper: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    minHeight: '56vh',
    padding: 10
  },
  icon: {
    color: 'white',
    textAlign: 'center'
  },
  txt: {
    fontFamily: 'Lemonada',
    fontSize: 20,
    paddingLeft: 20
  },
  tblTitle: {
    color: 'white',
    fontFamily: 'Lemonada',
    paddingBottom: 24,
    fontSize: 18
  },
  body: {
    color: 'white',
    padding: 22,
    fontSize: 18
  },
  btns: {
    display: 'flex',
    width: 70,
    justifyContent: 'center'
  },
  data: {
    fontFamily: 'Lemonada',
    fontSize: 16,
    textAlign: 'center'
  },
  underline: {
    "&:after": {
      borderBottom: '2px solid #0091c2'
    }
  }
})

class MyCustomers extends Component {
  state={
    disabled: true,
    input_first_name: '',
    input_last_name: '',
    input_area_code: '',
    input_phone: '',
    input_email: '',
    input_password: '',
    user_id: 0,
    modify_err: false,
    snackbar: false
  } 

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ 
      snackbar: false
    })
  }

  // when the admin clicks the edit button, state variables will be set to 
  // what is initially shown on the screen
  onEdit = i => {
    this.setState({
      user_id: this.props.customers[i].USER_ID,
      input_first_name: this.props.customers[i].USER_FNAME,
      input_last_name: this.props.customers[i].USER_LNAME,
      input_area_code: this.props.customers[i].USER_AREACODE,
      input_phone: this.props.customers[i].USER_PHONE,
      input_email: this.props.customers[i].USER_EMAIL,
      input_password: this.props.customers[i].USER_PASS,
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
        modify_err: !data, 
        snackbar: true, 
        disabled: true 
      })
    })
  }

  render () {
    const { 
      classes,  
      logged_in, //get props passed from App.js
      customers
    } = this.props

    // check if the user is logged in. if they aren't, redirect to the home page
    if (!logged_in) { 
      return <Redirect to='/' />
    }

    return (
      <div className={classes.background}>
        <Snackbar
          action={
            <React.Fragment>
              <IconButton
                aria-label='close'
                color='inherit'
                onClick={this.handleSnackbarClose}
                size='small'
              >
                <ClearIcon fontSize='small' />
              </IconButton>
            </React.Fragment>
          }
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom'
          }}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          open={this.state.snackbar}
          message={
            this.state.modify_err 
              ? 'Could not modify customer information at this time.' 
              : 'Customer information was successfully modified.'
          }
        />
        <div className={classes.container}>
            <Typography className={classes.txt}>Your Customers</Typography>
            <div className={classes.paper}>
              {customers.length === 0 ? ( // check if there are any managed customers
                <Typography className={classes.data}>No data to display at this time.</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tblTitle} align="center">Customer ID</TableCell>
                        <TableCell className={classes.tblTitle} align="center">First Name</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Last Name</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Area Code</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Phone</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Email</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Password</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Edit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((customer, i) => // map customers to a table
                        <TableRow key={i}>
                          <TableCell className={classes.body} align="center">
                            {/* null check on customer ID */}
                            {customer.USER_ID === null ? 'N/A' : customer.USER_ID} 
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon,
                                  underline: classes.underline
                                }}
                                // set name state variable to textfield input
                                onChange={(event) => this.setState({ input_first_name: event.target.value })}
                                // null check on customer first name
                                defaultValue={customer.USER_FNAME === null ? 'N/A' : customer.USER_FNAME} 
                                disabled={this.state.disabled}
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon,
                                  underline: classes.underline
                                }}
                                // set last name state variable to textfield input
                                onChange={(event) => this.setState({ input_last_name: event.target.value })}
                                // null check on customer last name
                                defaultValue={customer.USER_LNAME === null ? 'N/A' : customer.USER_LNAME} 
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon,
                                  underline: classes.underline
                                }}
                                // set area code state variable to textfield input
                                onChange={(event) => this.setState({ input_area_code: event.target.value })}
                                // null check on area code
                                defaultValue={customer.USER_AREACODE === null ? 'N/A' : customer.USER_AREACODE} 
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon,
                                  underline: classes.underline
                                }}
                                // set phone number state variable to textfield input
                                onChange={(event) => this.setState({ input_phone: event.target.value })}
                                // null check on phone number
                                defaultValue={customer.USER_PHONE === null ? 'N/A' : customer.USER_PHONE}
                                disabled={this.state.disabled} 
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon,
                                  underline: classes.underline
                                }}
                                // set email state variable to value of textfield input
                                onChange={(event) => this.setState({ input_email: event.target.value })}
                                // null check on email
                                defaultValue={customer.USER_EMAIL === null ? 'N/A' : customer.USER_EMAIL}
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon,
                                  underline: classes.underline
                                }}
                                // set password state variable to value of textfield input
                                onChange={(event) => this.setState({ input_password: event.target.value })}
                                // null check on password
                                defaultValue={customer.USER_PASS === null ? 'N/A' : customer.USER_PASS} 
                                disabled={this.state.disabled} 
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            {this.state.disabled ? (
                              <div className={classes.btns}>
                            <IconButton 
                              onClick={() => this.onEdit(i)} //defined above
                            >
                              <EditIcon className={classes.icon} />
                            </IconButton>
                            </div>
                            ) : (
                              <div className={classes.btns}>
                                <IconButton 
                                  onClick={() => this.onCustomerChange()} // defined above
                                >
                                  <CheckIcon className={classes.icon} />
                                </IconButton>
                                <IconButton onClick={() => this.setState({ disabled: true })}>
                                  <ClearIcon className={classes.icon} />
                                </IconButton>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                        )}
                      
                      </TableBody>
                    </Table>
                  </TableContainer>
                  )}
                </div>
              </div>
            </div>
        )
    }
}

export default withStyles(styles)(MyCustomers)