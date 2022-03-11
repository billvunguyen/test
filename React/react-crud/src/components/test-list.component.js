import React, { Component } from "react";
import TestDataService from "../services/test.service";
import { Link } from "react-router-dom";
import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";
class Testlist extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveTest = this.retrieveTest.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTest = this.setActiveTest.bind(this);
    this.removeAllTest = this.removeAllTest.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      test: [],
      currentTest: null,
      currentIndex: -1,
      searchName: ""
    };
  }
  componentDidMount() {
    this.retrieveTest();
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
        searchName: searchName
    });
  }
  retrieveTest() {
    TestDataService.getAll()
      .then(response => {
        this.setState({
          test: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveTest();
    this.setState({
      currentTest: null,
      currentIndex: -1
    });
  }
  setActiveTest(test, index) {
    this.setState({
      currentTest: test,
      currentIndex: index
    });
  }
  removeAllTest() {
    TestDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    TestDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          test: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { classes } = this.props
    const { searchName, test, currentTest, currentIndex } = this.state;
    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item md={12}>
            <TextField
              label="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchName}>
              Search
            </Button>
          </Grid>
          <Grid item md={4}>
            <h2>Test List</h2>
            <div className="list-group">
              {test &&
                test.map((test, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveTest(test, index)}
                    divider
                    button	
                    key={index}>
                    {test.name}
                  </ListItem>
                ))}
            </div>
            <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllTest}
            >
              Remove All
          </Button>
          </Grid>
          <Grid item md={8}>
            {currentTest ? (
              <div className={classes.test}>
                <h4>Tutorial</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentTest.name}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Type:</strong>
                  </label>{" "}
                  {currentTest.type}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTest.published ? "Published" : "Pending"}
                </div>
                <Link
                  to={"/tutorials/" + currentTest.id}
                  className={classes.edit}
                >
                  Edit
              </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.test}></p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Testlist)