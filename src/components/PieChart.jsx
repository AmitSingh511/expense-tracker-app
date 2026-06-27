import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";
import "./PieChart.css";

const COLORS = [
  "#534AB7",
  "#5DCAA5",
  "#FAC775",
  "#F09595",
  "#60A5FA",
  "#A78BFA",
  "#34D399",
];

function ExpensePieChart() {
  const { state } = useExpense();

  // Data preparation — group expenses by category
  const categoryData = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  if (categoryData.length === 0) {
    return (
      <div className="chart-box">
        <h3>Spending by Category</h3>
        <p className="no-data">No expense data yet</p>
      </div>
    );
  }

  return (
    <div className="chart-box">
      <h3>Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;
