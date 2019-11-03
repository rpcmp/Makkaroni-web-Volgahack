import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Auth from 'stores/Auth';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class Authorization extends Component {
  state = {
    username: '',
    lastName: '',
    firstName: '',
    isValid: true,
    isSignUp: false,
    isLoading: false,
  };

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  handleFirstName = event => {
    this.setState({ firstName: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username } = this.state;

    try {
      this.setState({ isLoading: true });
      await Auth.login(username);
      // eslint-disable-next-line no-undef
      this.props.history.push('/');
    } catch (e) {
      this.setState({ isSignUp: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmitSingUp = async event => {
    event.preventDefault();
    const { username, lastName, firstName } = this.state;
    try {
      this.setState({ isLoading: true });
      await Auth.singUp({ username, lastName, firstName });
      // eslint-disable-next-line no-undef
      this.props.history.push('/');
    } catch (e) {
      this.setState({ isValid: false });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  singIn = () => {
    const { username, isValid, isLoading } = this.state;
    return (
      <Grid container spacing={2}>
        <form
          onSubmit={this.handleSubmit}
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Username"
            margin="normal"
            variant="outlined"
            error={!isValid}
            value={username}
            onChange={this.handleUsername}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            this.setState({ isSignUp: true });
          }}
        >
          SignIn
        </Link>
      </Grid>
    );
  };

  singUp = () => {
    const { username, isValid, isLoading, lastName, firstName } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmitSingUp}>
          <TextField
            label="Username"
            margin="normal"
            variant="outlined"
            error={!isValid}
            value={username}
            onChange={this.handleUsername}
          />
          <TextField
            label="First name"
            margin="normal"
            variant="outlined"
            error={!isValid}
            value={firstName}
            onChange={this.handleFirstName}
          />
          <TextField
            label="Last name"
            margin="normal"
            variant="outlined"
            error={!isValid}
            value={lastName}
            onChange={this.handleLastName}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            SignIn
          </Button>
        </form>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            this.setState({ isSignUp: false });
          }}
        >
          SignUp
        </Link>
      </>
    );
  };

  render() {
    const { isSignUp } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
          >
            {isSignUp ? this.singUp() : this.singIn()}
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default Authorization;
