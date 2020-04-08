import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Input from '@material-ui/core/Input'

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
})

class MyCustomers extends Component {
    constructor(props) {
      super(props)

          this.state = {
      columns: [
        {
          title: 'Name', field: 'name',
          editComponent: props => (
            <input
              type="text"
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
            />
          )
        },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ],
      data: [
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]
    }
  }
    
    render () {
        const { classes } = this.props
        return (
            <div className={classes.background}>
              <div className={classes.container}>
                <Typography className={classes.txt}>Your Customers</Typography>
                <div className={classes.paper}>
                  {/* <MaterialTable
                    columns={this.state.columns}
                    data={this.state.data}        
                    // actions={[
                    //   {
                    //     icon: () => <EditIcon style={{color: 'white'}}/>,
                    //     tooltip: 'Edit Customer Information',
                    //     onClick: (event, rowData) =>  {
                          
                    //     }
                    //   }
                    // ]}
                    options={{
                      actionsColumnIndex: -1,
                      search: false,
                      toolbar: false,
                      paging: false,
                      draggable: false,
                      headerStyle: {
                        backgroundColor: '#000000',
                        color: 'white'
                        // textAlign: 'center'
                      },
                      rowStyle: {
                        backgroundColor: '#000000',
                        color: 'white',
                      },
                      cellStyle: {
                        textAlign: 'center'
                      }
                    }}
                    editable={{
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                        setTimeout(() => {
                          {
                            const data = this.state.data;
                            const index = data.indexOf(oldData);
                            data[index] = newData;
                            this.setState({ data }, () => resolve());
                          }
                          resolve()
                        }, 1000)
                      }),
                    }}
                  /> */}
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
                              <Input defaultValue="Disabled" disabled  />
                            </form>
                          </TableCell>
                          <TableCell className={classes.body} align="center"></TableCell>
                          <TableCell className={classes.body} align="center"></TableCell>
                          <TableCell className={classes.body} align="center"></TableCell>
                          <TableCell className={classes.body} align="center"></TableCell>
                          <TableCell className={classes.body} align="center"></TableCell>
                          <TableCell className={classes.body} align="center"><EditIcon style={{color: 'white'}} /></TableCell>
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