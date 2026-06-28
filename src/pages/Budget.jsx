import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import "./Budget.css";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Other",
];

function Budget() {
  const { state, dispatch } = useExpense();

  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [limitInput, setLimitInput] = useState("");

  function handleSetBudget() {
    if (!limitInput) {
      alert("Please enter a budget limit");
      return;
    }

    dispatch({
      type: "SET_BUDGET",
      payload: {
        category: selectedCategory,
        limit: parseFloat(limitInput),
      },
    });

    setLimitInput("");
  }

  function handleDeleteBudget(category) {
    dispatch({
      type: "DELETE_BUDGET",
      payload: category,
    });
  }

  function getSpentForCategory(category) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return state.transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          t.type === "expense" &&
          t.category === category &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }

  return (
    <div className="budget-container">
      <h1>Budget</h1>

      <div className="budget-form">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Set limit (₹)"
          value={limitInput}
          onChange={(e) => setLimitInput(e.target.value)}
        />

        <button onClick={handleSetBudget}>Set Budget</button>
      </div>

      <div className="budget-list">
        {Object.keys(state.budgets).length === 0 ? (
          <p className="no-data">No budgets set yet</p>
        ) : (
          Object.entries(state.budgets).map(([category, limit]) => {
            const spent = getSpentForCategory(category);
            const percent = Math.min((spent / limit) * 100, 100);
            const isOver = spent > limit;

            return (
              <div key={category} className="budget-item">
                <div className="budget-item-header">
                  <span className="budget-category">{category}</span>
                  <div className="budget-header-right">
                    <span className={isOver ? "budget-over" : "budget-amounts"}>
                      ₹{spent.toFixed(2)} / ₹{limit.toFixed(2)}
                    </span>
                    <button
                      className="delete-budget-btn"
                      onClick={() => handleDeleteBudget(category)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="progress-track">
                  <div
                    className={isOver ? "progress-fill-over" : "progress-fill"}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Budget;
