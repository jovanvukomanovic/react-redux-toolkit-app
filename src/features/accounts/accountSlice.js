import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // state.balance = state.balance + action.payload , it is same as this line down
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // because this actions can receive only one payload propety but I have two,I have set the payload with prepare() method, and divide down reducer() function, also this action is object.Also I did this because I dont wanted to change code, It could be easily set two actions for paylod amount and action with payload purpose. Not only for more payload properties, also when I want to make random id or some small sideeffects, I must to make, mine action object like this, with prepare function in it, with that sideeffect logic inside
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        // in redux-Toolkit we dont return state as in redux, because we dont need to return anything (not even state)
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    // payLoan has no payload, so it no need for action in parentheses
    payLoan(state) {
      // first is setted like this and nothing was happening, because I first set loan to be 0, than I have subtracted it, so to solve problem I have moved  state.balance -= state.loan at first posion. That is problem when state is directly mutating, we must have attention on order of code, but to folow order of code is good practice anyway
      // state.loan = 0;
      // state.loanPurpose = "";
      // state.balance -= state.loan;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    // convertingCurrency has no payload, so it no need for action in parentheses
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// if some error is found from dispatching some actions it is convinient to console.log some od these functions(actions), it is nice to work with redux dev tools also
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//  same function from coppied file (our custom action creator, it also can be mixed with redux toolkit like this because it dont need thunk), and exported independently from other actions above
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;

// somethimes is ok to write slices with redux-toolkit , but somethimes is easier to write on old way, but creating store with redux-toolkit is much better and easier way. So it could be done: store on new redux-toolkit way, but slices on old fashioned way
