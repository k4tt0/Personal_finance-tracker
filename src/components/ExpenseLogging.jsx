import React, { useState } from 'react';
import { db, storage } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ExpenseLogging = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [receipt, setReceipt] = useState(null);

  const handleAddExpense = async () => {
    let receiptUrl = "";
    if (receipt) {
      const storageRef = ref(storage, `receipts/${receipt.name}`);
      await uploadBytes(storageRef, receipt);
      receiptUrl = await getDownloadURL(storageRef);
    }

    const newExpense = {
      description,
      amount,
      category,
      currency,
      receipt: receiptUrl,
      date: new Date()
    };

    await addDoc(collection(db, 'expenses'), newExpense);
    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
    setCategory("");
    setCurrency("USD");
    setReceipt(null);
  };

  const handleReceiptChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <div>
      <h2>Log Your Expenses</h2>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </select>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RON">RON</option>
        </select>
        <input
          type="file"
          onChange={handleReceiptChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div>
        <h3>Logged Expenses</h3>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <p>Description: {expense.description}</p>
              <p>Amount: {expense.amount} {expense.currency}</p>
              <p>Category: {expense.category}</p>
              {expense.receipt && (
                <p>
                  Receipt: <a href={expense.receipt} target="_blank" rel="noopener noreferrer">View</a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseLogging;