import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputBase from '@material-ui/core/InputBase'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'

const styles = () => ({
  background: {
    backgroundColor: '#232428',
    color: 'white',
    margin: '10px -10px -10px -10px',
    height: '70vh',
    overflowX: 'hidden',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    margin: 40,
    width: 700,
  },
  paper: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    height: '40vh',
    minHeight: '56vh',
    padding: 10,
  },
  txt: {
    fontFamily: 'Lemonada',
    fontSize: 20,
    paddingLeft: 20
  },
  icon: {
    color: 'white'
  },
  input: {
    color: 'white',
    padding: '12px 0px 0px 10px'
  },
  form: {
    width: 400,
    marginTop: 50
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  btn: {
    color: 'white',
    backgroundColor: '#0091c2',
    float: 'right',
    marginTop: 120,
    marginRight: 20
  },
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

class CreateBankAccount extends Component {
  render () {
    const { classes, handleAccType, handleStartingBalance, createBankAccount, logged_in } = this.props

    if (!logged_in) {
      return <Redirect to='/' />
    }

    return (
      <div className={classes.background}>
        <div className={classes.container}>
          <Typography className={classes.txt}>Create an Account</Typography>
          <div className={classes.paper}>
            <form className={classes.main} autoComplete="off">
              <FormControl className={classes.form}>
                <InputLabel classes={{root: classes.input}}>Account Type</InputLabel>
                <NativeSelect
                  classes={{
                    icon: classes.icon
                  }}
                  onChange={handleAccType}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>SYB Checking</option>
                  <option value={2}>SYB Savings</option>
                  <option value={3}>SYB Money Market</option>
                </NativeSelect>
              </FormControl>
               <FormControl className={classes.form}>
                <InputLabel 
                  classes={{root: classes.input}}
                  onChange={handleStartingBalance}
                >
                  Starting Balance
                </InputLabel>
                <BootstrapInput />
              </FormControl>
              <FormControl className={classes.form}>
                <InputLabel classes={{root: classes.input}} >What's it for?</InputLabel>
                <BootstrapInput />
              </FormControl>
            </form>
            <Button 
              className={classes.btn}
              onClick={createBankAccount}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CreateBankAccount)