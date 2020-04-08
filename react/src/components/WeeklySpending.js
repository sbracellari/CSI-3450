import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
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
    height: '71vh',
    overflowX: 'hidden'
  },
  btn: {
    color: 'white',
    backgroundColor: '#ee3636',
    float: 'right',
    margin: '-10px 30px 40px 0px'
  },
  box: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    margin: '60px 70px 40px 70px',
    width: '60%'
  },
  content: {
    padding: 40,
    textAlign: 'center'
  },
  paper: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    minHeight: '45vh',
    padding: 10
  },
  title: {
    color: 'white',
    backgroundColor: '#ee3636'
  },
  txt: {
    fontFamily: 'Lemonada',
    fontSize: 20,
    paddingLeft: 20,
    paddingBottom: 5
  },
  warning: {
    margin: '40px 0px 0px 0px'
  },
  tblTitle: {
    color: 'white',
    fontFamily: 'Lemonada',
    paddingBottom: 24,
    fontSize: 18,
    width: '50%'
  },
  body: {
    color: 'white',
    padding: 22,
    fontSize: 18
  },
})

class WeeklySpending extends Component {
  state={
    dialogOpen: false
  }
  handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  }
  render () {
    const { classes } = this.props
    const { dialogOpen } = this.state
    return (
      <div className={classes.background}>
        <div className={classes.box}>
        <div className={classes.container}>
          <Typography className={classes.txt}>Weekly Spending</Typography>
          <div className={classes.paper}>
             <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tblTitle} align="center">Amount</TableCell>
                          <TableCell className={classes.tblTitle} align="center">Week</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      <TableRow>
                          <TableCell className={classes.body} align="center"></TableCell>
                          <TableCell className={classes.body} align="center"></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
          </div>
        </div>
        </div>
        <Button
          className={classes.btn}
          onClick={() => this.setState({ dialogOpen: true })}
        >
          Close Account
        </Button>
        <Dialog
          open={dialogOpen}
          onClose={this.handleDialogClose}
        >
          <DialogTitle className={classes.title}>Close this Account?</DialogTitle>
          <DialogContent className={classes.content}>
            <Typography>Close your SYB Money Market account? <br /> This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              autoFocus
              onClick={this.handleDialogClose}
            >
              Cancel
            </Button>
            <Button>
              Close Account
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) 
  }
}

export default withStyles(styles)(WeeklySpending)