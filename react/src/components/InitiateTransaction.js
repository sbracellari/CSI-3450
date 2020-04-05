import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

const styles = () => ({
  background: {
    backgroundColor: '#232428',
    color: 'white',
    margin: '10px -10px -10px -10px',
    height: '71vh',
    overflowX: 'hidden',
    display: 'flex'
  },
  bottomTab: {
    margin: '100px 0px 0px 0px'
  },
  btn: {
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Lemonada',
    fontSize: 24
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 100px 30px 100px'
  },
  indicator: {
    backgroundColor: '#232428'
  },
  panel: {
    margin: 75,
    width: '50%',
    backgroundColor: '#000000'
  },
  tabs: {
    margin: '75px 75px 75px 150px',
  },
  tab: {
      display: 'flex'
  },
  topTab: {
    margin: '0px 0px 100px 0px'
  },
})
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      aria-labelledby={`simple-tab-${index}`}
      component="div"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

class InitiateTransaction extends Component {
  state={
    value: 0
  }

  handleChange = (event, value) => {
      this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.background}>
        <Tabs
          className={classes.tabs}
          centered="true"
          classes={{
            indicator: classes.indicator,
            fixed: classes.tab
          }}
          onChange={this.handleChange}
          orientation="vertical"
          textColor="inherit"
          value={value}
        >
          <Tab
            className={classes.topTab}
            classes={{
              root: classes.btn
            }} 
            label="Transfer" 
          />
          <Tab 
            classes={{
              root: classes.btn
            }}
            label="Deposit" 
          />
          <Tab 
            className={classes.bottomTab}
            classes={{
              root: classes.btn
            }}
            label="Withdraw" 
          />
        </Tabs>
        <TabPanel value={value} index={0} className={classes.panel}>
          <div className={classes.form}>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.panel}>
          <div className={classes.form}>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.panel}>
          <div className={classes.form}>
          </div>
        </TabPanel>
      </div>
    )
  }
}

export default withStyles(styles)(InitiateTransaction)