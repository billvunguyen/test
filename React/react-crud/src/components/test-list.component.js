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
}
export default withStyles(styles)(Testlist)