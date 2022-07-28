import "@babel/polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import { v4 as uuidv4 } from 'uuid';

import { loginWithToken } from './firebase';

const USERID_STORAGE_KEY = 'TRIPL_USER_ID';

function createAndStoreUserId() {
  const uid = uuidv4();
  localStorage.setItem(USERID_STORAGE_KEY, uid);
  return uid;
}

let userId = localStorage.getItem(USERID_STORAGE_KEY) || createAndStoreUserId();

loginWithToken(userId);

const App = () => userId;

ReactDOM.render(<App/>, document.getElementById('app'));
