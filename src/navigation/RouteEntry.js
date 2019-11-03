import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from 'screens/Search';
import NoMatch from 'screens/NoMatch';
import ContributionMap from 'screens/ContributionMap';
import EventsCalendar from 'screens/Calendar';
import DayPhrase from 'screens/DayPhrase/DayPhrase';
import Authorization from 'screens/Authorization';

class RouteEntry extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/auth" component={Authorization} />
            <Route path="/map" component={ContributionMap} />
            <Route path="/day_phrase" component={DayPhrase} />
            <Route path="/calendar" component={EventsCalendar} />
            <Route path="/" component={Search} />
            <Route component={NoMatch} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default RouteEntry;
