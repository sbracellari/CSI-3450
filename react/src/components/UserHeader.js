import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from "react-router-dom"

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
      marginLeft: 150
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
    const { classes } = this.props
    return (
      <div className={classes.root}>
      <AppBar
        className={classes.bar}
        position="static"
      >
      <div className={classes.display}>
        <div className={classes.container}>
          <Link to='/user/home' className={classes.img} />
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
            to='/user/initiate-transaction'
            classes={{root: classes.btn}}
          >
            Initiate a transaction
          </Button>
          <Button
            component={Link}
            to='/user/transaction-history'
            classes={{root: classes.btn}}
            className={classes.toolbar2}
          >
            Transaction history
          </Button>
          <Button
            component={Link}
            to='/user/weekly-spending'
            classes={{root: classes.btn}}
            className={classes.toolbar2}
          >
            Spending by week
          </Button>
          <Button
            component={Link}
            to='/user/create-bank-account'
            classes={{root: classes.btn}}
            className={classes.toolbar2}
          >
            Create bank account
          </Button>
      </Toolbar>
      <Button 
        classes={{root: classes.logout}}
        className={classes.button}
        component={Link}
        to='/'
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