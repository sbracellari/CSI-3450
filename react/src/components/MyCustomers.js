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

  render () {
    const { 
      classes,  
      logged_in, //get props passed from App.js
      customers,
      modify_err,
      handleInputFirstName,
      handleInputLastName,
      handleInputAreaCode,
      handleInputPhone,
      handleInputEmail,
      handleInputPass,
      onEdit,
      onCustomerChange,
      disabled,
      onCancel,
      customerSnackbar,
      handleCustomerSnackbarClose
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
                onClick={handleCustomerSnackbarClose}
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
          onClose={handleCustomerSnackbarClose}
          open={customerSnackbar}
          message={
            modify_err 
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
                                onChange={handleInputFirstName} // defined in App.js
                                // null check on customer first name
                                defaultValue={customer.USER_FNAME === null ? 'N/A' : customer.USER_FNAME} 
                                disabled={disabled}
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
                                onChange={handleInputLastName} // defined in App.js
                                // null check on customer last name
                                defaultValue={customer.USER_LNAME === null ? 'N/A' : customer.USER_LNAME} 
                                disabled={disabled}  
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
                                onChange={handleInputAreaCode} // defined in App.js
                                // null check on area code
                                defaultValue={customer.USER_AREACODE === null ? 'N/A' : customer.USER_AREACODE} 
                                disabled={disabled}  
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
                                onChange={handleInputPhone} // defined in App.js
                                // null check on phone number
                                defaultValue={customer.USER_PHONE === null ? 'N/A' : customer.USER_PHONE}
                                disabled={disabled} 
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
                                onChange={handleInputEmail} // defined in App.js
                                // null check on email
                                defaultValue={customer.USER_EMAIL === null ? 'N/A' : customer.USER_EMAIL}
                                disabled={disabled}  
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
                                onChange={handleInputPass} // defined in App.js
                                // null check on password
                                defaultValue={customer.USER_PASS === null ? 'N/A' : customer.USER_PASS} 
                                disabled={disabled} 
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            {disabled ? (
                              <div className={classes.btns}>
                            <IconButton 
                              onClick={() => onEdit(i)} //defined in App.js
                            >
                              <EditIcon className={classes.icon} />
                            </IconButton>
                            </div>
                            ) : (
                              <div className={classes.btns}>
                                <IconButton 
                                  onClick={() => onCustomerChange()} // defined in App.js
                                >
                                  <CheckIcon className={classes.icon} />
                                </IconButton>
                                <IconButton onClick={onCancel}>
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