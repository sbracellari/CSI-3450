import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import { Typography, Button, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ListItemText from '@material-ui/core/ListItemText'
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
  }
})

class UserHome extends Component {
  render() {
    const { classes } = this.props
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
                    primary="Debit card usage this week: "
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
                <CardContent>
                  <List>
                  </List>
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button className={classes.infoBtn}>
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

export default withStyles(styles)(UserHome)