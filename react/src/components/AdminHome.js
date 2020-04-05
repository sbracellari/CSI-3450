import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import { Typography, Button, List } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { Link } from 'react-router-dom'

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
  }
})

class AdminHome extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.background}>
        <div className={classes.img} />
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={6}>
            <Typography className={classes.txt}>My customers</Typography>
            <Paper className={classes.paper}>
                <Card className={classes.card}>
                    <CardContent>
                        <List>

                        </List>
                    </CardContent>
                        <CardActions className={classes.actions}>
                        <Button 
                          className={classes.infoBtn}
                          component={Link}
                          to='/admin/my-customers'
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
                        <List>
                            
                        </List>
                    </CardContent>
                        <CardActions className={classes.actions}>
                        <Button
                          className={classes.infoBtn}
                          component={Link}
                          to='/admin/pending-transactions'  
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