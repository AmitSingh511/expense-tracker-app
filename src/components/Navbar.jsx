import { NavLink } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">💰 SpendSmart</span>
      <div className="navbar-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/add">Add Expense</NavLink>
        <NavLink to="/budget">Budget</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
