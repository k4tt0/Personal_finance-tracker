import React, { useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './BudgetManagement.css';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [spending, setSpending] = useState({});

  const handleAddBudget = async () => {
    const newBudget = {
      category,
      amount: parseFloat(amount),
      currency
    };

    await addDoc(collection(db, 'budgets'), newBudget);
    setBudgets([...budgets, newBudget]);
    setCategory("");
    setAmount("");
    setCurrency("USD");
  };

  const handleSpendingChange = (category, amount) => {
    setSpending(prevSpending => ({
      ...prevSpending,
      [category]: (prevSpending[category] || 0) + parseFloat(amount)
    }));
  };

  return (
    <div className="budget-management-container">
      <h2>Budget Management</h2>
      <div className="budget-form">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="budget-input"
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="budget-input"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="budget-input"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RON">RON</option>
        </select>
        <button onClick={handleAddBudget} className="budget-button">Add Budget</button>
      </div>
      <div className="budget-list">
        <h3>Monthly Budgets</h3>
        <ul>
          {budgets.map((budget, index) => (
            <li key={index} className="budget-item">
              <p>Category: {budget.category}</p>
              <p>Budget: {budget.amount} {budget.currency}</p>
              <p>Spent: {spending[budget.category] || 0} {budget.currency}</p>
              <p>Remaining: {budget.amount - (spending[budget.category] || 0)} {budget.currency}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="log-spending">
        <h3>Log Spending</h3>
        <div className="spending-form">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="budget-input"
          >
            <option value="">Select Category</option>
            {budgets.map((budget, index) => (
              <option key={index} value={budget.category}>{budget.category}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="budget-input"
          />
          <button onClick={() => handleSpendingChange(category, amount)} className="budget-button">Log Spending</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;