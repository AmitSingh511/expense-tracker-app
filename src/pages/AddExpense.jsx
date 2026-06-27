import "./AddExpense.css";
import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import { v4 as uuidv4 } from "uuid";
function AddExpense() {
  const { dispatch } = useExpense();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  function handleSubmit() {
    if (!description || !amount || !date) {
      alert("Please fill in all the fields");
      return;
    }
    const newTransaction = {
      id: uuidv4(),
      description: description,
      amount: parseFloat(amount),
      type: type,
      category: category,
      date: date,
    };
    dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate("");
  }
  return (
    <div className="add-expense-container">
      <h1>Add Transaction</h1>
      <div className="form-group">
        <label htmlFor="">Description</label>
        <input
          type="text"
          placeholder="e.g. Swiggy order"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Amount (₹)</label>
        <input
          type="number"
          placeholder="e.g. 480"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Type</label>
        <select
          name=""
          id=""
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Add Transaction</button>
    </div>
  );
}

export default AddExpense;
