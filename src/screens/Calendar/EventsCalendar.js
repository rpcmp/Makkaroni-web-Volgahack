import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Auth from 'stores/Auth';
import { AUTH_SERVER_ADDRESS, USER_TOKEN } from '../../utils/constants';
import { computed, observable } from 'mobx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Header from '../../components/Header';
import List from '@material-ui/core/List';

const useStyles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

@observer
class EventsCalendar extends Component {
  state = {
    date: new Date(),
  };

  @computed
  get user() {
    return Auth.username;
  }

  @observable listOfMeeting = [];

  onChange = async date => {
    this.setState({ date });
    const listOfMeeting = await axios.get(
      AUTH_SERVER_ADDRESS +
        'api/meetings/between?startDate=' +
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        '&endDate=' +
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate(),
      {
        headers: {
          username: this.user,
        },
      }
    );
    console.log(listOfMeeting);
    this.listOfMeeting = listOfMeeting.data;
  };

  renderCard = ({ id, date, user, coordinates }) => {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography variant="h5" component="h2">
            {user}
          </Typography>
          <Typography variant="h5" component="h2">
            X: {coordinates[0]} Y: {coordinates[1]} Z: {coordinates[2]}
          </Typography>
          <CardActions>
            <Button size="small">За лапшой!!!</Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  };

  render() {
    return (
      <div>
        <Header history={this.props.history}>
          <Calendar onChange={this.onChange} value={this.state.date} />
          <List
            style={{
              width: '100%',
            }}
          >
            {this.listOfMeeting && this.listOfMeeting.length
              ? this.listOfMeeting.map(card => this.renderCard(card))
              : null}
          </List>
        </Header>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(EventsCalendar);
