import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";
import "./LineChart.css";

function ExpenseLineChart() {
  const { state } = useExpense();

  // Same data preparation pattern as the Bar chart
  const monthlyData = state.transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const existing = acc.find((item) => item.month === month);
    if (existing) {
      if (t.type === "income") existing.income += t.amount;
      else existing.expense += t.amount;
    } else {
      acc.push({
        month,
        income: t.type === "income" ? t.amount : 0,
        expense: t.type === "expense" ? t.amount : 0,
      });
    }
    return acc;
  }, []);

  // Sort chronologically so the line trend makes sense
  monthlyData.sort((a, b) => new Date(a.month) - new Date(b.month));

  if (monthlyData.length === 0) {
    return (
      <div className="chart-box">
        <h3>Income vs Expenses Trend</h3>
        <p className="no-data">No transaction data yet</p>
      </div>
    );
  }

  return (
    <div className="chart-box">
      <h3>Income vs Expenses Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#5DCAA5"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#AFA9EC"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseLineChart;
