import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import { Typography, Button, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ListItemText from '@material-ui/core/ListItemText'
import { Link, Redirect } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

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
  large: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    height: '40vh',
    padding: 10
  },
  medium: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    height: '27vh',
    padding: 10,
  },
  small: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    height: '9vh',
    padding: 10,
  },
  item: {
    maxWidth: '100%'
  },
  primary: {
    fontFamily: 'Lemonada',
    fontSize: 18,
    color: 'white'
  },
  quote: {
    fontFamily: 'Lemonada',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    paddingTop: 75
  },
  author: {
    fontFamily: 'Lemonada',
    fontSize: 18,
    color: 'white',
    textAlign: 'end',
    paddingTop: 40,
    marginRight: 40
  },
  grid2: {
    marginTop: 30
  },
  list: {
    paddingTop: 17
  },
  title: {
    color: 'white',
    fontFamily: 'Lemonada',
    paddingBottom: 24,
    fontSize: 16
  },
  body: {
    color: 'white',
    padding: 22,
    fontSize: 16
  },
  content: {
    margin: '20px 0px 20px 0px'
  },
  data: {
    fontFamily: 'Lemonada',
    fontSize: 16,
    textAlign: 'center'
  }
})

class UserHome extends Component {
  render() {
    const { classes, weekly_spending, transaction_history, balances, logged_in, debit_card_usage } = this.props

    if (!logged_in) {
      return <Redirect to="/" />
    }

    return (
      <div className={classes.background}>
        <div className={classes.img} />
        <Grid container spacing={3} className={classes.grid}>
          <Grid 
          classes={{
            item: classes.item
          }}
          className={classes.grid2}
          item xs={6}>
            <Grid 
            classes={{
              item: classes.item
            }}
            item xs={6}>
              <Paper className={classes.small}>
                <List className={classes.list}>
                  <ListItem>
                    <ListItemText
                    primary={`Debit card usage this week: $${debit_card_usage}`}
                    classes={{
                      primary: classes.primary
                    }}
                    />
                    <ListItemSecondaryAction>
                      <Button 
                        size="small" 
                        className={classes.infoBtn}
                        component={Link}
                        to='/user/weekly-spending'
                      >
                        More information
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid 
            classes={{
              item: classes.item
            }}
            item xs={6}>
              <Paper className={classes.medium}>
                <Typography className={classes.quote}>
                  If you're saving, you're succeeding.
                </Typography>
                <Typography className={classes.author}>
                  - Steve Burkholder
                </Typography>
            </Paper>
          </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.txt}>Balances</Typography>
            <Paper className={classes.large}>
              <Card className={classes.card}>
                <CardContent className={classes.content}>
                  {balances.length === 0 ? (
                    <Typography className={classes.data}>No data to display at this time.</Typography>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.title} align="center">Account Type</TableCell>
                            <TableCell className={classes.title} align="center">Account Number</TableCell>
                            <TableCell className={classes.title} align="center">Balance</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {balances.slice(0, 4).map((balances, i) => 
                            <TableRow key={i}>
                              <TableCell className={classes.body} align="center">
                                {balances.ACCT_TYPE === null ? 'N/A' : balances.ACCT_TYPE}
                              </TableCell>
                              <TableCell className={classes.body} align="center">
                                {balances.ACCT_NUMBER === null ? 'N/A' : balances.ACCT_NUMBER}
                              </TableCell>
                              <TableCell className={classes.body} align="center">
                                {balances.ACCT_BALANCE === null ? 'N/A' : `$${balances.ACCT_BALANCE}`}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(UserHome)