const initialStateCustomer = { fullName: "", nationalId: "", createdAT: "" };

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        customerId: action.payload.customerId,
        createdAT: action.payload.createdAT,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

// action creators for customers,
// name of action cretor is the same as second part of type-string /createCustomer

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAT: new Date().toISOString() },
  };
}

export function updateName(name) {
  return { type: "customer/updateName", payload: { name } };
}
