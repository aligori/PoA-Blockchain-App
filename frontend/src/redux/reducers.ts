import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import loaderReducer from './slices/loaderSlice';

const rootReducer = combineReducers({ auth: authReducer, loader: loaderReducer, });

export default rootReducer;
