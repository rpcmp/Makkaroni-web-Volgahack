import { types, onSnapshot, flow, applySnapshot } from 'mobx-state-tree';
import api from 'service/api';
import asyncLocalStorage from 'service/asyncLocalStorage';
import { USER_TOKEN, AUTH_SERVER_ADDRESS } from 'utils/constants';
import axios from 'axios';

const User = types.model({
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  about: types.optional(types.string, ''),
  coordinates: types.optional(types.array(types.number), []),
  grade: types.optional(types.string, ''),
});

const USER_STORE_KEY = 'USER_STORE_KEY';
let onSnapshotListener = null;
const Users = types
  .model({
    user: types.maybeNull(User),
  })
  .views(self => ({
    get isAuth() {
      if (self.user && self.user.username) return true;
      return false;
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
          self.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            about: user.about,
            grade: user.grade,
            coordinates: user.coordinates,
          };
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
          self.user = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            aboutMe: user.aboutMe,
          };
        }
      }),
    };
  })
  .create();

export default Users;
