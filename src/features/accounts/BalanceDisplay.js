// import { connect } from "react-redux";

import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useSelector((store) => store.account);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// older way of connecting state from redux via connect function and mapStateToProps like this.Also that balance property from mapStateToProps I take as prop up in component and on that way I read data from redux
// function mapStateToProps(state) {
//   return {
//     balance: state.account.balance,
//   };
// }

// export default connect(mapStateToProps)(BalanceDisplay);

export default BalanceDisplay;
