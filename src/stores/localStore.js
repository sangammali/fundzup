// localStore.js

import { appConstants } from 'helpers/constants/appConstants';
import { localstorageService } from 'helpers/services/localstorageService';

const localStore = {};

localStore.setToken = (v) =>
  localstorageService.set(appConstants.localStorage.tokenKey, v);

localStore.getToken = () =>
  localstorageService.get(appConstants.localStorage.tokenKey);

localStore.resetToken = () =>
  localstorageService.remove(appConstants.localStorage.tokenKey);

// Add a method to set the user's name in local storage
localStore.setName = (userName) =>
  localstorageService.set(appConstants.localStorage.userNameKey, userName);

// Add a method to get the user's name from local storage
localStore.getName = () =>
  localstorageService.get(appConstants.localStorage.userNameKey);

export { localStore };
