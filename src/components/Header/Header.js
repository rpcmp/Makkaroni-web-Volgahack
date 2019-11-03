import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Logotype from '../Logotype';
import LinkBtn from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { computed, observable } from 'mobx';
import Auth from 'stores/Auth';
import { observer } from 'mobx-react';
import asyncLocalStorage from '../../service/asyncLocalStorage';
import { USER_TOKEN } from '../../utils/constants';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  input: {
    color: '#fff',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

@observer
class Header extends React.Component {
  @computed
  get isAuth() {
    return Auth.isAuth;
  }

  // @computed
  // get user() {
  //   return Auth.user;
  // }

  @observable open = false;
  @observable user = '';

  async componentDidMount() {
    this.user = await asyncLocalStorage.getItem(USER_TOKEN);
  }

  handleDrawerOpen = () => {
    this.open = true;
  };

  handleDrawerClose = () => {
    this.open = false;
  };

  render() {
    const { children, inputProps, history, classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.open && classes.hide)}
            >
              M
            </IconButton>
            {inputProps ? (
              <InputBase
                className={classes.input}
                placeholder="Поиск по библии"
                {...inputProps}
              />
            ) : null}
            <div style={{ marginLeft: 'auto' }}>
              {this.user ? (
                <Chip
                  avatar={<Avatar>{this.user[0]}</Avatar>}
                  label={this.user}
                  onClick={() => {}}
                  variant="outlined"
                />
              ) : (
                <LinkBtn
                  component="button"
                  variant="body2"
                  style={{ color: '#fff' }}
                  onClick={() => {
                    history.push('/auth');
                  }}
                >
                  SignIn / SingUp
                </LinkBtn>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <div
              style={{
                flexDirection: 'column',
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            >
              <p style={{ paddingBottom: 4, fontSize: 15 }}>
                <Logotype style={{ marginBottom: -4 }} />
                akkaroni
              </p>
            </div>
            <IconButton onClick={this.handleDrawerClose}>CL</IconButton>
          </div>
          <Divider />
          <List>
            {[
              { title: 'Поиск по библии', address: '/' },
              { title: 'Фраза дня', address: '/day_phrase' },
              { title: 'Календарь событий', address: '/calendar' },
              { title: 'Злачная карта', address: '/map' },
            ].map(({ title, address }) => (
              <ListItem button key={title}>
                <Link to={address}>
                  <ListItemText primary={title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    );
  }
}
export default withStyles(useStyles, { withTheme: true })(Header);
