// import necessary packages
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputBase from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Redirect } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'

// apply styles
const styles = () => ({
  background: {
    backgroundColor: '#232428',
    color: 'white',
    margin: '10px -10px -10px -10px',
    height: '72vh',
    overflowX: 'hidden'
  },
  btn: {
    color: 'white',
    backgroundColor: '#ee3636',
    float: 'right',
    margin: '-10px 30px 40px 0px'
  },
  box: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    margin: '30px 70px 40px 70px',
    width: '60%'
  },
  content: {
    padding: 40,
    textAlign: 'center'
  },
  paper: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    minHeight: '45vh',
    padding: 10
  },
  title: {
    color: 'white',
    backgroundColor: '#ee3636'
  },
  txt: {
    fontFamily: 'Lemonada',
    fontSize: 20,
    paddingLeft: 20,
    height: 30, 
    marginTop: 30
  },
  warning: {
    margin: '40px 0px 0px 0px'
  },
  icon: {
    color: 'white'
  },
  input: {
    color: 'white',
    padding: '12px 0px 0px 10px'
  },
  form: {
    marginRight: 22,
    width: 200
  },
  main: {
    display: 'flex',
    justifyContent: 'space-between'
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
  data: {
    fontFamily: 'Lemonada',
    fontSize: 16,
    textAlign: 'center'
  },
  red: {
    color: '#d02b2b',
    padding: 22,
    fontSize: 18
  },
  green: {
    color: '#72c541',
    padding: 22,
    fontSize: 18
  }
})

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    color: 'white',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#0091c2',
      boxShadow: '0 0 0 0.2rem rgba(0,145, 194,.25)',
    },
  },
}))(InputBase)

class TransactionHistory extends Component {
   render () {
    const { 
      classes, 
      logged_in, // get props passed in App.js
      transaction_history, 
      accounts, 
      handleAccChange,
      delete_err,
      deleteSnackbar,
      handleDeleteSnackbarClose,
      onAccountDelete,
      dialogOpen,
      handleDialogClose,
      handleDialog
    } = this.props

    // check if user is logged in. if they aren't, redirect to welcome page
    if (!logged_in) {
      return <Redirect to='/'/>
    }

    return (
      <div className={classes.background}>
        <Snackbar
          action={
            <React.Fragment>
              <IconButton
                aria-label='close'
                color='inherit'
                onClick={handleDeleteSnackbarClose}
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
          onClose={handleDeleteSnackbarClose}
          open={deleteSnackbar}
          message={
            delete_err 
              ? 'Account could not be deleted.' 
              : 'Account deleted successfully.'
          }
        />
        <div className={classes.box}>
          <div className={classes.container}>
            <div className={classes.main}>
              <Typography className={classes.txt}>Transaction History</Typography>
              <form autoComplete="off">
                <FormControl className={classes.form}>
                  <InputLabel classes={{root: classes.input}}>Account</InputLabel>
                  <NativeSelect
                    classes={{
                      icon: classes.icon
                    }}
                    onChange={handleAccChange}
                    input={<BootstrapInput />}
                  >
                    <option>None</option>
                    {accounts.map((accounts, i) => // map user accounts to options fields
                      <option key={i}>{accounts.ACCT_NUMBER}</option>
                    )}
                  </NativeSelect>
                </FormControl>
              </form>
            </div>
            <div className={classes.paper}>
              {transaction_history.length === 0 ? ( // check if there is any transaction history for the selected account
                <Typography className={classes.data}>No data to display at this time.</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tblTitle} align="center">Update Amount</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Update Date</TableCell>
                        <TableCell className={classes.tblTitle} align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transaction_history.map((history, i) => 
                        <TableRow key={i}>
                          {/* check if update amount is null. if it is, display 'N/A'. if it not,
                          check if it's negative or positive. if negative, make it red, else make
                          it green and add a plus in front of it */}
                          {history.UPDATE_AMOUNT === null ? (
                            'N/A'
                          ) : (
                            history.UPDATE_AMOUNT < 0 ? (
                              <TableCell className={classes.red} align="center">
                                {history.UPDATE_AMOUNT}
                              </TableCell>
                            ) : (
                              <TableCell className={classes.green} align="center">
                                +{history.UPDATE_AMOUNT}
                              </TableCell>
                            )
                          )}
                          {/* null checks on the other two columns */}
                          <TableCell className={classes.body} align="center">
                            {history.UPDATE_DATE === null ? 'N/A' : history.UPDATE_DATE}
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            {history.APPROVED === null ? 'N/A' : history.APPROVED}
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
      <Button
        className={classes.btn}
        onClick={handleDialog}
      >
        Close Account
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle className={classes.title}>Close this Account?</DialogTitle>
        <DialogContent className={classes.content}>
          <Typography>Close your SYB Money Market account? <br /> This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            onClick={onAccountDelete} // defined in App.js
          >
            Close Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    ) 
  }
}

export default withStyles(styles)(TransactionHistory)