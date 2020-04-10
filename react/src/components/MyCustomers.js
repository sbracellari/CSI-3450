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
    minHeight: '40vh',
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
      input_password: ''
    } 
  
    render () {
        const { 
          classes, 
          first_name, 
          last_name, 
          area_code, 
          phone, 
          email, 
          password, 
          logged_in,
          onCustomerChange
        } = this.props

      if (!logged_in) { 
        return <Redirect to='/' />
      }

        return (
            <div className={classes.background}>
              <div className={classes.container}>
                <Typography className={classes.txt}>Your Customers</Typography>
                <div className={classes.paper}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tblTitle} align="center">First Name</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Last Name</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Area Code</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Phone</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Email</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Password</TableCell>
                          <TableCell className={classes.tblTitle} align="center"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      <TableRow>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon
                                }}
                                defaultValue={first_name} 
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon
                                }}
                                defaultValue={last_name} 
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon
                                }}
                                defaultValue={area_code} 
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon
                                }}
                                defaultValue={phone}
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon
                                }}
                                defaultValue={email}
                                disabled={this.state.disabled}  
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input 
                                classes={{
                                  input: classes.icon
                                }}
                                defaultValue={password} 
                                disabled={this.state.disabled} 
                              />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            {this.state.disabled ? (
                              <div className={classes.btns}>
                            <IconButton onClick={() => this.setState({ disabled: false })}>
                              <EditIcon className={classes.icon} />
                            </IconButton>
                            </div>
                            ) : (
                              <div className={classes.btns}>
                                <IconButton onClick={onCustomerChange}>
                                  <CheckIcon className={classes.icon} />
                                </IconButton>
                                <IconButton onClick={() => this.setState({ disabled: true })}>
                                  <ClearIcon className={classes.icon} />
                                </IconButton>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
        )
    }
}

export default withStyles(styles)(MyCustomers)