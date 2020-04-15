// import necessary packages
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from "react-router-dom"

// apply styles
const styles = () => ({
 img: {
    backgroundImage: 'url(' + require('../img/syb-logo.png') + ')',
    height: '7vh',
    backgroundRepeat: 'no-repeat',
    width: 150,
    marginTop: 5,
    overflow: 'hidden'
  },
  bar: {
   backgroundColor: '#000000', 
   boxShadow: 'none', 
   height: 160, 
   margin: -10,
   width: '102%',
   padding: '0px 10px 0px 10px' 
  },
  display: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Lemonada',
    fontSize: 20,
    color: 'white',
    marginLeft: 20,
    display: 'flex',
    alignItems: 'center'
  },
  container: {
      display: 'flex',
      marginTop: 12,
      marginLeft: 15
  },
  btn: {
      color: 'white',
      textTransform: 'none'
  },
  toolbar1: {
      marginTop: 20
  },
  toolbar2: {
      marginLeft: 150,
          width: '65%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  logout: {
      color: 'white',
      backgroundColor: '#0091c2'
  },
  button: {
    marginRight: 70,
    height: 35,
    width: 100,
    display: 'flex',
    alignSelf: 'center'
  },
  button2: {
      marginRight: 20
  },
  root: {
    overflow: 'hidden',
    margin: -10
  }
})

class UserHeader extends Component {
  render() {
    const { 
      classes, 
      onLogout // get props passed in App.js
    } = this.props

    return (
      <div className={classes.root}>
        <AppBar
          className={classes.bar}
          position="static"
        >
          <div className={classes.display}>
            <div className={classes.container}>
              <Link 
                to='/user/home' // link to user home page
                className={classes.img} 
              />
              <Typography className={classes.title}>Take hold of your finances</Typography>
            </div>
            <Toolbar className={classes.toolbar1}>
              <Button
                classes={{root: classes.btn}}
                className={classes.button2}
              >
                About
              </Button>
              <Button
                classes={{root: classes.btn}}
                className={classes.button2}
              >
                FAQ
              </Button>
              <Button
                classes={{root: classes.btn}}
                className={classes.button2}
              >
                Help
              </Button>
            </Toolbar>
          </div>
          <div className={classes.display}>
            <Toolbar className={classes.toolbar2}>
              <Button
                component={Link}
                to='/user/initiate-transaction' // link to transactions page
                classes={{root: classes.btn}}
              >
                Initiate a transaction
              </Button>
              <Button
                component={Link}
                to='/user/transaction-history' // link to transaction history page
                classes={{root: classes.btn}}
              >
                Transaction history
              </Button>
              <Button
                component={Link}
                to='/user/weekly-spending' // link to weekly spending page
                classes={{root: classes.btn}}
              >
                Spending by week
              </Button>
              <Button
                component={Link}
                to='/user/create-bank-account' // link to create bank account page
                classes={{root: classes.btn}}
              >
                Create bank account
              </Button>
            </Toolbar>
            <Button 
              classes={{root: classes.logout}}
              className={classes.button}
              component={Link}
              onClick={onLogout} // defined in App.js
              to='/' // link to welcome page
            >
              LOGOUT
            </Button>
          </div>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(UserHeader)