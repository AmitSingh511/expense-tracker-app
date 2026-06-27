import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import "./Transactions.css";

const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Salary",
  "Other",
];

function Transactions() {
  const { state, dispatch } = useExpense();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  function handleDelete(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  // Apply all filters in sequence
  const filteredTransactions = state.transactions
    .filter((t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((t) =>
      categoryFilter === "All" ? true : t.category === categoryFilter,
    )
    .filter((t) => (typeFilter === "All" ? true : t.type === typeFilter));

  return (
    <div className="transactions-container">
      <h1>Transactions</h1>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search by description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="no-data">No transactions match your filters</p>
      ) : (
        filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-desc">
                {transaction.description}
              </span>
              <span className="transaction-category">
                {transaction.category}
              </span>
              <span className="transaction-date">{transaction.date}</span>
            </div>
            <div className="transaction-right">
              <span
                className={
                  transaction.type === "income"
                    ? "amount-income"
                    : "amount-expense"
                }
              >
                {transaction.type === "income" ? "+" : "-"} ₹
                {transaction.amount}
              </span>
              <button onClick={() => handleDelete(transaction.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Transactions;
