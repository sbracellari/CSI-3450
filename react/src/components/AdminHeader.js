import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

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
    width: '30%',
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

class AdminHeader extends Component {
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
          <Link to='/admin/home' className={classes.img} />
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
            to='/admin/my-customers'
            classes={{root: classes.btn}}
          >
            My customers
          </Button>
          <Button
            component={Link}
            to='/admin/pending-transactions'
            classes={{root: classes.btn}}
          >
            Pending transactions
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

export default withStyles(styles)(AdminHeader)