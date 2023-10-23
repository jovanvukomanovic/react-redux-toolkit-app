// redux toolkit gives option to gradually update our earlier redux app, with new features, as it is seen in copied earlier store file,  this is simplier, it is only needed configureStore, no redux thunk, no combineReducers, no composeWithReduxDevTools... if it is left like this with nothing more updated (except this file )from earlier version, it is going to work with no problems

import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;

// somethimes is ok to write slices with redux-toolkit , but somethimes is easier to write on old way, also creating store with redux-toolkit is much better and easier way. So it could be done: store on new redux-toolkit way, but slices on old fashioned way
