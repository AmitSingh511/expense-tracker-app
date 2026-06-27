import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";
import "./BarChart.css";

function ExpenseBarChart() {
  const { state } = useExpense();

  // Data preparation — group by month
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

  if (monthlyData.length === 0) {
    return (
      <div className="chart-box">
        <h3>Monthly Overview</h3>
        <p className="no-data">No transaction data yet</p>
      </div>
    );
  }

  return (
    <div className="chart-box">
      <h3>Monthly Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="income" fill="#5DCAA5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#AFA9EC" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseBarChart;
