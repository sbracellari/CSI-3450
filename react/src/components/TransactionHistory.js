import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = () => ({
  background: {
    backgroundColor: '#232428',
    color: 'white',
    margin: '10px -10px -10px -10px',
    height: '72vh',
    overflowX: 'hidden'
  },
  btn: {
    color: 'white',
    backgroundColor: '#ee3636',
    float: 'right',
    margin: '-10px 30px 40px 0px'
  },
  container: {
    margin: '30px 70px 40px 70px'
  },
  content: {
    padding: 40
  },
  paper: {
    margin: '5px 20px 20px 20px',
    backgroundColor: '#000000',
    borderRadius: 'none',
    minHeight: '56vh',
    height: '70vh',
    padding: 10
  },
  title: {
    color: 'white',
    backgroundColor: '#ee3636'
  },
  txt: {
    fontFamily: 'Lemonada',
    fontSize: 20,
    paddingLeft: 20
  },
  warning: {
    margin: '40px 0px 0px 0px'
  }
})

class TransactionHistory extends Component {
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
        <div className={classes.container}>
          <Typography className={classes.txt}>Transaction History</Typography>
          <div className={classes.paper}>
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
            <Typography>Close your SYB Money Market account?</Typography>
            <Typography className={classes.warning}><strong>Warning:</strong> This action cannot be undone.</Typography>
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

export default withStyles(styles)(TransactionHistory)