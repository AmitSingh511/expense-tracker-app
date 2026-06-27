import { useExpense } from "../context/ExpenseContext";
import ExpensePieChart from "../components/PieChart";
import ExpenseBarChart from "../components/BarChart";

import "./Dashboard.css";
function Dashboard() {
  const { state } = useExpense();
  const totalIncome = state.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="summary-cards">
        <div className="card balance-card">
          <p className="card-label">Total Balance</p>
          <h2 className="card-value">₹{balance.toFixed(2)}</h2>
        </div>
        <div className="card income-card">
          <p className="card-label">Total Income</p>
          <h2 className="card-value">₹{totalIncome.toFixed(2)}</h2>
        </div>

        <div className="card expense-card">
          <p className="card-label">Total Expenses</p>
          <h2 className="card-value">₹{totalExpenses.toFixed(2)}</h2>
        </div>
      </div>
      <div className="charts-grid">
        <ExpenseBarChart />
        <ExpensePieChart />
      </div>
    </div>
  );
}

export default Dashboard;
