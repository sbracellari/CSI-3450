import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Info from '@material-ui/icons/Info'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  button: {
    color: '#000000',
    opacity: 0.8
  },
  card: {
    borderLeft: '10px solid #0091c2',
    margin:10
  },
  header: {
    borderBottom: '1px solid #d3d3d3',
    borderRadius: 0
  },
  icon: {
    color: '#0091c2',
    fontSize: 30
  },
  iconButton: {
    alignSelf: 'center',
    paddingTop: 5
  },
  link: {
    marginLeft: 5
  },
  root: {
    color: 'black',
    marginTop: 40,
    position: 'relative',
    width: '100%'
  },
  title: {
    fontSize: 16,
    marginLeft: -200
  }
})

class ErrorPage extends Component {
  render() {
    const { classes } = this.props
    
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            classes={{
              action: classes.iconButton,
              title: classes.title
            }}
            avatar={
              <Info className={classes.icon} />
            }
            title="There is currently no data to display"
          >
          </CardHeader>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(ErrorPage)