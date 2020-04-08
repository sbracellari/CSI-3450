import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import { Redirect } from 'react-router-dom'

const styles = () => ({
  background: {
    background: 'linear-gradient(180deg, #232428 30%, #000000 30%)',
    height: '101vh',
    margin: -10,
    color: 'white'
  },
  footer: {
   position: 'fixed',
   bottom: 0,
   display: 'flex', 
   justifyContent: 'center',
   color: 'white',
   fontSize: 12,
   width: '100%',
   paddingBottom: 5
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 350
  },
  btn: {
    color: 'white',
    backgroundColor: '#0091c2',
    marginLeft: 225
  },
  button: {
    marginLeft: 30
  },
  link: {
    color: 'white'
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 30,
    paddingBottom: 20,
    alignItems: 'center'
  },
  top: {
    display: 'flex',
    paddingBottom: 20
  },
  icon: {
    marginTop: 2,
    paddingRight: 10
  },
  bottom: {
    display: 'flex'
  },
  input: {
    color: 'white',
    '&:before': {
      borderBottomColor: 'white'
    },
    '&:after': {
      borderBottomColor: 'white'
    }
  },
   img: {
    backgroundImage: 'url(' + require('../img/syb-logo.png') + ')',
    height: '7vh',
    backgroundRepeat: 'no-repeat',
    width: 150,
  },
  txt: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Lemonada',
      marginTop: 15,
      marginBottom: 40
  }
})

class Login extends Component {
    render() {

    const { 
      classes, 
      handleEmail, 
      handlePass,
      logged_in,
      login_err,
      onLogin,
      is_admin,
      is_user
    } = this.props

      if (logged_in && is_admin) {
        return <Redirect to='/admin/home' />
      } else if (logged_in && is_user) {
        return <Redirect to='/user/home' />
      } 

        return (
            <div className={classes.background}>
                <div className={classes.container}>
                  <div className={classes.img} />
                  <Typography className={classes.txt}>Take hold of your finances</Typography>
                   {login_err && (
                    <Typography className={classes.link}>
                      Your email or password is incorrect.
                    </Typography>
                  )}
                  <form className={classes.text} noValidate autoComplete="off">
                    <div className={classes.top}>
                      <div className={classes.icon}><PersonIcon /></div> 
                      <TextField 
                      InputProps={{
                          className: classes.input
                      }}
                      onChange={handleEmail}
                      placeholder="email" />
                    </div>
                    <div className={classes.bottom}>
                      <div className={classes.icon}><LockOutlinedIcon /></div> 
                      <TextField 
                      InputProps={{
                           className: classes.input
                      }}
                      onChange={handlePass}
                      type="password" placeholder="password" />
                    </div>
                  </form> 
                  <Button 
                    className={classes.btn}
                    onClick={onLogin}  
                  >
                    login
                  </Button>
                </div>
                <footer className={classes.footer}>
                    <Typography>New to SYB Bank? {" "}
                      <Link 
                        className={classes.link}
                        to='/register'
                      >
                        Create an account
                      </Link>
                    </Typography>
                </footer>
            </div>
        )
    }
}

export default withStyles(styles)(Login)