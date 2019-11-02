import { types, onSnapshot, flow, applySnapshot } from 'mobx-state-tree';
import api from 'service/api';
import asyncLocalStorage from 'service/asyncLocalStorage';
import { USER_TOKEN, AUTH_SERVER_ADDRESS } from 'utils/constants';
import axios from 'axios';

const User = types.model({
  username: types.string,
  aboutMe: types.optional(types.string, ''),
  prefix: types.optional(types.string, '🍝'),
  localAddress: types.optional(types.string, ''),
});

const USER_STORE_KEY = 'USER_STORE_KEY';
let onSnapshotListener = null;
const Users = types
  .model({
    products: types.array(User),
  })
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
        const response = yield axios.post(AUTH_SERVER_ADDRESS, { username });
        console.log('response', response);
        //if(response)
        //yield asyncLocalStorage.setItem(USER_TOKEN, username);
      }),
    };
  })
  .create();

export default Users;
