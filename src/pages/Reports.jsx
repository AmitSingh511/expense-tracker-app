import { useExpense } from "../context/ExpenseContext";
import ExpenseLineChart from "../components/LineChart";
import ExpensePieChart from "../components/PieChart";
import "./Reports.css";

function Reports() {
  const { state } = useExpense();

  const totalIncome = state.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : 0;

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      <div className="reports-summary">
        <div className="report-stat">
          <p className="stat-label">Savings Rate</p>
          <h2 className="stat-value">{savingsRate}%</h2>
        </div>
        <div className="report-stat">
          <p className="stat-label">Total Transactions</p>
          <h2 className="stat-value">{state.transactions.length}</h2>
        </div>
      </div>

      <div className="reports-charts">
        <ExpenseLineChart />
        <ExpensePieChart />
      </div>
    </div>
  );
}

export default Reports;
