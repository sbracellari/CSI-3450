// import necessary packages
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputBase from '@material-ui/core/InputBase'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
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
    height: '71vh',
    overflowX: 'hidden',
    display: 'flex'
  },
  bottomTab: {
    margin: '100px 0px 0px 0px'
  },
  btn: {
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Lemonada',
    fontSize: 24
  },
    icon: {
    color: 'white'
  },
  input: {
    color: 'white',
    padding: '12px 0px 0px 10px'
  },
  form2: {
    width: 400,
    marginTop: 20
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 40px 40px 40px'
  },
  btn2: {
    color: 'white',
    backgroundColor: '#0091c2',
    float: 'right',
    marginRight: 10,
    marginBottom: 30,
    marginTop: -10
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 100px 30px 100px'
  },
  indicator: {
    backgroundColor: '#232428'
  },
  panel: {
    margin: 75,
    width: '40%',
    backgroundColor: '#000000'
  },
  tabs: {
    margin: '75px 75px 75px 275px',
  },
  tab: {
      display: 'flex'
  },
  topTab: {
    margin: '0px 0px 100px 0px'
  },
  btn3: {
    color: 'white',
    backgroundColor: '#0091c2',
    float: 'right',
    marginRight: 10,
    marginBottom: 30,
    marginTop: 85
  },
  amt: {
    padding: '15px 0px 0px 0px'
  }
})

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    }
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      aria-labelledby={`simple-tab-${index}`}
      component="div"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

class InitiateTransaction extends Component {
  state={
    value: 0
  }

  handleChange = (event, value) => {
      this.setState({ value })
  }

  render() {
    const { 
      classes, 
      onTransfer, // get props passed from App.js
      onDeposit, 
      onWithdraw,
      handleAccFrom,
      handleAccTo,
      handleAmt,
      logged_in,
      accounts,
      transaction_error,
      snackbar,
      handleSnackbarClose,
      amt_err
    } = this.props
    const { value } = this.state

    // check if the user is logged in. if not, redirect them to the welcome page
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
                onClick={handleSnackbarClose}
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
          onClose={handleSnackbarClose}
          open={snackbar}
          message={
            transaction_error 
              ? 'Could not complete transaction at this time.' 
              : 'Transaction successful.'
          }
         />
        <Tabs
          className={classes.tabs}
          centered="true"
          classes={{
            indicator: classes.indicator,
            fixed: classes.tab
          }}
          onChange={this.handleChange}
          orientation="vertical"
          textColor="inherit"
          value={value}
        >
          <Tab
            className={classes.topTab}
            classes={{
              root: classes.btn
            }} 
            label="Transfer" 
          />
          <Tab 
            classes={{
              root: classes.btn
            }}
            label="Deposit" 
          />
          <Tab 
            className={classes.bottomTab}
            classes={{
              root: classes.btn
            }}
            label="Withdraw" 
          />
        </Tabs>
        <TabPanel value={value} index={0} className={classes.panel}>
          <div>
          <div className={classes.form}>
            <div className={classes.main} autoComplete="off">
              <FormControl className={classes.form2}>
                <InputLabel classes={{root: classes.input}}>Transfer from...</InputLabel>
                <NativeSelect
                  classes={{
                    icon: classes.icon
                  }}
                  onChange={handleAccFrom} // defined in App.js
                  input={<BootstrapInput />}
                >
                  <option>None</option>
                {accounts.map((accounts, i) => // display all of the user's accounts in the dropdown
                  <option key={i}>{accounts.ACCT_NUMBER}</option>
                )}
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.form2}>
                <InputLabel classes={{root: classes.input}}>Transfer to...</InputLabel>
                <NativeSelect
                  classes={{
                    icon: classes.icon
                  }}
                  onChange={handleAccTo} // defined in App.js
                  input={<BootstrapInput />}
                >
                  <option>None</option>
                {accounts.map((accounts, i) => // display all of the user's accounts in the dropdown
                  <option key={i}>{accounts.ACCT_NUMBER}</option>
                )}
                </NativeSelect>
              </FormControl>
               <FormControl
                className={classes.form2}
              >
                <BootstrapInput
                  classes={{root: classes.input}} 
                  onChange={handleAmt} // defined in App.js
                  placeholder="Amount..."
                  className={classes.amt} 
                  error={amt_err}
                />
              </FormControl>
              <FormControl className={classes.form2}>
                <InputLabel classes={{root: classes.input}} >What's it for?</InputLabel>
                <BootstrapInput />
              </FormControl>
            </div>
            </div>
            <Button 
              className={classes.btn2}
              onClick={onTransfer} // defined in App.js
            >
              Transfer
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.panel}>
          <div>
          <div className={classes.form}>
            <form className={classes.main} autoComplete="off">
              <FormControl className={classes.form2}>
                <InputLabel classes={{root: classes.input}}>Deposit into...</InputLabel>
                <NativeSelect
                  classes={{
                    icon: classes.icon
                  }}
                  onChange={handleAccTo} // defined in App.js
                  input={<BootstrapInput />}
                >
                  <option>None</option>
                {accounts.map((accounts, i) => // display all of the user's accounts in the dropdown
                  <option key={i}>{accounts.ACCT_NUMBER}</option>
                )}
                </NativeSelect>
              </FormControl>
               <FormControl className={classes.form2}>
                <BootstrapInput
                  classes={{root: classes.input}} 
                  onChange={handleAmt} // defined in App.js
                  placeholder="Amount..."
                  className={classes.amt}
                  error={amt_err}
                />
              </FormControl>
              <FormControl className={classes.form2}>
                <InputLabel classes={{root: classes.input}} >What's it for?</InputLabel>
                <BootstrapInput />
              </FormControl>
            </form>
            </div>
            <Button 
              className={classes.btn3}
              onClick={onDeposit} //defined in App.js
            >
              Deposit
            </Button>
          </div>
        </TabPanel><TabPanel value={value} index={2} className={classes.panel}>
          <div>
          <div className={classes.form}>
            <form className={classes.main} autoComplete="off">
              <FormControl className={classes.form2}>
                <InputLabel classes={{root: classes.input}}>Withdraw from...</InputLabel>
                <NativeSelect
                  classes={{
                    icon: classes.icon
                  }}
                  onChange={handleAccFrom} // defined in App.js
                  input={<BootstrapInput />}
                >
                  <option>None</option>
                {accounts.map((accounts, i) => // display all of the user's accounts in the dropdown
                  <option key={i}>{accounts.ACCT_NUMBER}</option>
                )}
                </NativeSelect>
              </FormControl>
               <FormControl className={classes.form2}>
                <BootstrapInput
                  classes={{root: classes.input}} 
                  onChange={handleAmt} // defined in App.js
                  placeholder="Amount..."
                  className={classes.amt} 
                  error={amt_err}
                />
              </FormControl>
              <FormControl className={classes.form2}>
                <InputLabel classes={{root: classes.input}} >What's it for?</InputLabel>
                <BootstrapInput />
              </FormControl>
            </form>
            </div>
            <Button 
              className={classes.btn3}
              onClick={onWithdraw} // defined in App.js
            >
              Withdraw
            </Button>
          </div>
        </TabPanel>
      </div>
    )
  }
}

export default withStyles(styles)(InitiateTransaction)