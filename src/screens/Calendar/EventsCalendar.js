import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Auth from 'stores/Auth';
import { AUTH_SERVER_ADDRESS, USER_TOKEN } from '../../utils/constants';
import { computed } from 'mobx';

@observer
class EventsCalendar extends Component {
  state = {
    date: new Date(),
  };

  @computed
  get user() {
    return Auth.username;
  }
  onChange = async date => {
    this.setState({ date });
    await axios.get(AUTH_SERVER_ADDRESS + '', {
      headers: {
        username: this.user
      },
    });
  };

  render() {
    return (
      <div>
        <Calendar onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}

export default EventsCalendar;
