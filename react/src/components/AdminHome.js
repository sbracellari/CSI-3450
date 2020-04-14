// import necessary packages
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import { Typography, Button } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { Link, Redirect } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

//apply styles 
const styles = () => ({
  background: {
    backgroundColor: '#232428',
    color: 'white',
    margin: '10px -10px -10px -10px',
    height: '70vh',
    overflowX: 'hidden'
  },
  img: {
    backgroundImage: 'url(' + require('../img/home.jpg') + ')',
    height: '35vh',
    padding: 20,
    margin: 20,
    backgroundRepeat: 'no-repeat',
    width: '96%',
    backgroundSize: 'cover'
  },
  paper: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    height: '40vh',
    padding: 10
  },
  grid: {
    marginTop: 40
  },
  txt: {
    fontFamily: 'Lemonada',
    fontSize: 20,
    paddingLeft: 20
  },
  infoBtn: {
      color: 'white',
      backgroundColor: '#0091c2'
  },
  card: {
      backgroundColor: '#000000',
      height: '40vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
  },
  actions: {
      alignSelf: 'flex-end'
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
  }
})

class AdminHome extends Component {
  render() {
    const { 
      classes, 
      customers, // get props passed from App.js
      pending_transactions, 
      logged_in 
    } = this.props

    // check if user is still logged in. if not, redirect them to the welcome page
    if (!logged_in) {
      return <Redirect to="/" />
    }

    return (
      <div className={classes.background}>
        <div className={classes.img} />
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={6}>
            <Typography className={classes.txt}>My customers</Typography>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardContent>
                  {customers.length === 0 ? ( // check if the admin has any managed customers
                    <Typography className={classes.data}>No data to display at this time.</Typography>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tblTitle} align="center">Customer ID</TableCell>
                            <TableCell className={classes.tblTitle} align="center">First Name</TableCell>
                            <TableCell className={classes.tblTitle} align="center">Last Name</TableCell>
                            <TableCell className={classes.tblTitle} align="center">Email</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {customers.slice(0, 3).map((customer, i) => // only show the fist three customers on the home page
                            <TableRow key={i}>
                              <TableCell className={classes.body} align="center">
                                {customer.USER_ID === null ? 'N/A' : customer.USER_ID} 
                              </TableCell>
                              <TableCell className={classes.body} align="center">
                                {customer.USER_FNAME === null ? 'N/A' : customer.USER_FNAME}
                              </TableCell>
                              <TableCell className={classes.body} align="center">
                                {customer.USER_LNAME === null ? 'N/A' : customer.USER_LNAME}
                              </TableCell>
                              <TableCell className={classes.body} align="center">
                                {customer.USER_EMAIL === null ? 'N/A' : customer.USER_EMAIL}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button 
                    className={classes.infoBtn}
                    component={Link}
                    to='/admin/my-customers' // link to dedicated customers page
                  >
                    View more
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.txt}>Pending transactions</Typography>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardContent>
                  {pending_transactions.length === 0 ? ( // check if there are any pending transactions
                    <Typography className={classes.data}>No data to display at this time.</Typography>
                  ) : (
                    <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tblTitle} align="center">Trans ID</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Customer ID</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Account From</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Account To</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Update Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pending_transactions.slice(0, 3).map((transactions, i) => // only show first three transactions on home page
                        <TableRow key={i}>
                          <TableCell className={classes.body} align="center">
                            {transactions.TRANS_ID === null ? 'N/A' : transactions.TRANS_ID}
                            </TableCell>
                          <TableCell className={classes.body} align="center">
                            {transactions.CUS_ID === null ? 'N/A' : transactions.CUS_ID}
                            </TableCell>
                          <TableCell className={classes.body} align="center">
                            {transactions.ACCT_FROM === null ? 'N/A' : transactions.ACCT_FROM}
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            {transactions.ACCT_TO === null ? 'N/A' : transactions.ACCT_TO}
                          </TableCell>
                          <TableCell className={classes.body} align="center">
                            {transactions.UPDATE_AMT === null ? 'N/A' : transactions.UPDATE_AMOUNT}
                          </TableCell>
                        </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  )}
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button
                    className={classes.infoBtn}
                    component={Link}
                    to='/admin/pending-transactions' // link to dedicated pending transactions page
                  >
                    View more
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AdminHome)