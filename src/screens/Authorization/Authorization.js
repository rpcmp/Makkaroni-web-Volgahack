import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Auth from 'stores/Auth';

class Authorization extends Component {
  state = {
    username: '',
    isValid: true,
  };

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username } = this.state;
    // if (!username || username.length < 5 || username.length > 40) {
    //   this.setState({ isValid: false });
    //   return null;
    // }
    const user = await Auth.login(username);
    console.log('Users', user);
  };

  render() {
    const { username, isValid } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
          >
            <form onSubmit={this.handleSubmit.bind(this)}>
              <TextField
                label="Username"
                margin="normal"
                variant="outlined"
                error={!isValid}
                value={username}
                onChange={this.handleUsername}
              />
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </form>
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default Authorization;
