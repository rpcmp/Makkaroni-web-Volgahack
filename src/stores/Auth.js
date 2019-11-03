import { types, flow } from 'mobx-state-tree';
import asyncLocalStorage from 'service/asyncLocalStorage';
import { USER_TOKEN, AUTH_SERVER_ADDRESS } from 'utils/constants';
import axios from 'axios';

const User = types.model({});

const Users = types
  .model('User', {
    firstName: types.optional(types.maybeNull(types.string), ''),
    lastName: types.optional(types.maybeNull(types.string), ''),
    about: types.optional(types.maybeNull(types.string), ''),
    coordinates: types.optional(types.array(types.number), []),
    grade: types.optional(types.maybeNull(types.string), ''),
  })
  .views(self => ({
    get isAuth() {
      if (self.user && self.user.username) return true;
      return false;
    },
    get username() {
      const user = localStorage.getItem(USER_TOKEN);
      if (user) {
        return user;
      }
      return null;
    },
  }))
  .actions(self => {
    return {
      // init: flow(function*() {
      //   const json = yield asyncLocalStorage.getItem(USER_STORE_KEY);
      //   if (json) {
      //     const snapshot = JSON.parse(json);
      //     applySnapshot(self, snapshot);
      //   }
      //   if (!onSnapshotListener)
      //     onSnapshotListener = onSnapshot(self, snapshot => {
      //       asyncLocalStorage.setItem(USER_STORE_KEY, JSON.stringify(snapshot));
      //     });
      // }),
      login: flow(function*(username) {
        const response = yield axios.post(
          AUTH_SERVER_ADDRESS + 'login',
          undefined,
          {
            headers: { username: username },
          }
        );
        if (response.status) {
          yield asyncLocalStorage.setItem(USER_TOKEN, username);
          const user = response.data;
          self.firstName = user.firstName;
          self.lastName = user.lastName;
          self.about = user.about;
          self.grade = user.grade;
          //self.coordinates = user.coordinates;
        }
        console.log('response', response);
      }),
      singUp: flow(function*({ username, lastName, firstName }) {
        const response = yield axios.post(AUTH_SERVER_ADDRESS + 'register', {
          username,
          lastName,
          firstName,
        });
        console.log('response', response);
        if (response.status) {
          yield asyncLocalStorage.setItem(USER_TOKEN, username);
          const user = response.data;
          console.log(user);
          self.firstName = user.firstName;
          self.lastName = user.lastName;
          self.about = user.about;
          self.grade = user.grade;
          // self.coordinates = user.coordinates;
        }
      }),
    };
  })
  .create();

export default Users;
