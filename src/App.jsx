import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <ExpenseProvider>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </ExpenseProvider>
  );
}

export default App;
