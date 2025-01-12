import React, { useState } from 'react';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [spending, setSpending] = useState({});

  const handleAddBudget = () => {
    const newBudget = {
      category,
      amount: parseFloat(amount),
      currency
    };
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
    <div>
      <h2>Budget Management</h2>
      <div>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RON">RON</option>
        </select>
        <button onClick={handleAddBudget}>Add Budget</button>
      </div>
      <div>
        <h3>Monthly Budgets</h3>
        <ul>
          {budgets.map((budget, index) => (
            <li key={index}>
              <p>Category: {budget.category}</p>
              <p>Budget: {budget.amount} {budget.currency}</p>
              <p>Spent: {spending[budget.category] || 0} {budget.currency}</p>
              <p>Remaining: {budget.amount - (spending[budget.category] || 0)} {budget.currency}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Log Spending</h3>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          />
          <button onClick={() => handleSpendingChange(category, amount)}>Log Spending</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;