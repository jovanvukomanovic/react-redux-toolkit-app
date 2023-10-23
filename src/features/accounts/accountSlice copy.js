const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// action creators , it can also be applied to useReducer hook
export function deposit(amount, currency) {
  // this is important to we return action if we do not need conversion with api call, because if I was not setted this guard clause, automatically converted function would be returned
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // API call, if we need to convert currency with api call we must place it in thunk function , that receives  dispatch and getState function from redux, and later that data what we receives from function is dispatched
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // dispatching action, when this action is dispatched and loading state in it is setted to false
    dispatch({ type: "account/deposit", payload: converted });
  };
}

// before its used action names like this, so then with this capital letters we change in action creators and in reducer function
// const ACCOUNT_WITHDRAW = "account/withdraw"

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
