import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Auth from 'stores/Auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import asyncLocalStorage from '../../service/asyncLocalStorage';
import { USER_TOKEN } from '../../utils/constants';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

@observer
class Authorization extends Component {
  @observable isLoading = false;
  @observable username = '';
  @observable lastName = '';
  @observable firstNme = '';

  setUsername = event => {
    this.username = event.target.value;
  };

  componentDidMount() {
    if (asyncLocalStorage.getItem(USER_TOKEN)) this.props.history.push('/');
  }

  login = async event => {
    event.preventDefault();
    try {
      this.isLoading = true;
      await Auth.login(this.username);
      return this.props.history.push('/');
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.login}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.username}
                onChange={this.setUsername}
                id="email"
                label="Username"
                name="username"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Authorization);
