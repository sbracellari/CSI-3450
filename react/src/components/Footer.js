import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import CopyrightIcon from '@material-ui/icons/Copyright'

const styles = () => ({
  img: {
    backgroundImage: 'url(' + require('../img/syb-logo.png') + ')',
    height: '7vh',
    backgroundRepeat: 'no-repeat',
    width: 150,
    margin: 30
  },
  bar: {
   backgroundColor: '#000000', 
   boxShadow: 'none', 
   height: 150, 
   margin: -10,
   width: '102%',
   padding: '0px 10px 0px 10px' ,
   position: 'fixed',
   bottom: 0,
   zIndex: 1
  },
  display: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
      color: 'white',
      textTransform: 'none'
  },
  toolbar1: {
      marginTop: 15
  },
  button: {
      marginRight: 100,
      marginLeft: 100
  },
  txt: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bolder'
  },
  icon: {
      color: 'white'
  },
  display2: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 60
  },
})

class Footer extends Component {
  render() {
    const { classes } = this.props
    return (
        <footer className={classes.bar}>
      <div className={classes.display}>
          <div className={classes.img} />
        <Toolbar className={classes.toolbar1}>
            <Button
              classes={{root: classes.btn}}
              className={classes.button}
            >
                About
            </Button>
            <Button
              classes={{root: classes.btn}}
              className={classes.button}
            >
                FAQ
            </Button>
            <Button
              classes={{root: classes.btn}}
              className={classes.button}
            >
                Help
            </Button>
            <Button
              classes={{root: classes.btn}}
              className={classes.button}
            >
                Contact Us
            </Button>
        </Toolbar>
        <div className={classes.display2}>
            <CopyrightIcon  className={classes.icon} />
            <Typography className={classes.txt}>SYB BANK</Typography>
        </div>

      </div>
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)