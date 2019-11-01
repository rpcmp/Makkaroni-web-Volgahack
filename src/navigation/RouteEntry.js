import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Entry from 'screens/Entry';
import NoMatch from 'screens/NoMatch';

class RouteEntry extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/Entry" component={Entry} />
            <Route component={NoMatch} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default RouteEntry;
