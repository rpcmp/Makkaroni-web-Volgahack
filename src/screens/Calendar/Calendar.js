import React, { Component } from 'react';
import Header from 'components/Header';
import moment from 'moment';
import { observer } from 'mobx-react';

@observer
class Calendar extends Component {
  state = {
    type: 'month',
  };

  onTypeChange = type => {
    this.setState({
      type,
    });
  };

  render() {
    const now = moment();

    const defaultCalendarValue = now.clone();
    defaultCalendarValue.add(-1, 'month');

    return (
      <div>
        <Header history={this.props.history} >
          Calendar
        </Header>
      </div>
    );
  }
}

export default Calendar;
