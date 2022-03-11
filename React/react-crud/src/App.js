import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"
import AddTest from "./components/add-test.component";
import Test from "./components/test.component";
import TestList from "./components/test-list.component";
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
              Test Les bons artisans
            </Typography>
            <Link to={"/test"} className={classes.link}>
              <Typography variant="body2">
                Test
              </Typography>
            </Link>
            <Link to={"/add"} className={classes.link}>
              <Typography variant="body2">
                Add
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>
          <Switch>
            <Route exact path={["/", "/test"]} component={TestList} />
            <Route exact path="/add" component={AddTest} />
            <Route path="/test/:id" component={Test} />
          </Switch>
      </div>
    );
  }
}
export default withStyles(styles)(App);
