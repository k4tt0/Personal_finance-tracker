import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../config/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

const ExpenseLogging = ({ theme }) => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [receipt, setReceipt] = useState(null);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isExpenseSaved, setIsExpenseSaved] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); // To display full details when clicked

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      fetchExpenses(auth.currentUser.uid); // Fetch expenses when user is logged in
    }
  }, []);

  const fetchExpenses = async (userId) => {
    try {
      const q = query(collection(db, 'expenses'), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const fetchedExpenses = [];
      querySnapshot.forEach((doc) => {
        fetchedExpenses.push(doc.data());
      });
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
    }
  };

  const handleAddExpense = async () => {
    if (!description || !amount || !category) {
      setErrorMessage("Please fill in all the required fields (Description, Amount, Category).");
      return;
    }

    if (receipt) {
      const fileSizeInMB = receipt.size / (1024 * 1024); 
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(receipt.type)) {
        setErrorMessage("Invalid file type. Only JPG, PNG, and PDF files are allowed.");
        return;
      }
      if (fileSizeInMB > 5) {
        setErrorMessage("File size should not exceed 5MB.");
        return;
      }
    }

    setErrorMessage("");

    try {
      // Upload the receipt to Firebase Storage if provided
      if (receipt) {
        const storageRef = ref(storage, `receipts/${user.uid}/${Date.now()}_${receipt.name}`);
        await uploadBytes(storageRef, receipt);
      }

      const newExpense = {
        description,
        amount,
        category,
        currency,
        date: new Date(),
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
      };

      // Save expense to Firestore (without receipt)
      await addDoc(collection(db, 'expenses'), newExpense);

      setExpenses([...expenses, newExpense]);
      setDescription("");
      setAmount("");
      setCategory("");
      setCurrency("USD");
      setReceipt(null);
      setIsExpenseSaved(true);

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setIsExpenseSaved(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding expense: ", error);
      setErrorMessage("There was an error saving your expense. Please try again.");
    }
  };

  const handleReceiptChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense); // Show full details when clicking on an expense
  };

  const handleCloseDetails = () => {
    setSelectedExpense(null); // Close the details view
  };

  return (
    <div className={theme === 'dark' ? 'dark-mode' : 'light-mode'}>
      <h2>Log Your Expenses</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </select>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RON">RON</option>
        </select>

        {/* File input for receipt */}
        <input type="file" accept="image/jpeg, image/png, application/pdf" onChange={handleReceiptChange} />
        
        <button onClick={handleAddExpense}>
          {isExpenseSaved ? "Saved Successfully" : "Add Expense"}
        </button>
      </div>

      <div>
        <h3>Logged Expenses</h3>
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
          {expenses.map((expense, index) => (
            <li 
              key={index} 
              onClick={() => handleExpenseClick(expense)} 
              style={{ cursor: 'pointer', marginBottom: '10px', textAlign: 'center' }}
            >
              <p 
                style={{ 
                  color: theme === 'dark' ? 'white' : 'black', 
                  textDecoration: 'none',
                  fontWeight: 'normal',
                  transition: 'text-decoration 0.3s ease' 
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                {expense.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Show full details of the selected expense */}
      {selectedExpense && (
        <div>
          <h3>Expense Details</h3>
          <p style={{ color: theme === 'dark' ? 'white' : 'black' }}><strong>Description:</strong> {selectedExpense.description}</p>
          <p style={{ color: theme === 'dark' ? 'white' : 'black' }}><strong>Amount:</strong> {selectedExpense.amount} {selectedExpense.currency}</p>
          <p style={{ color: theme === 'dark' ? 'white' : 'black' }}><strong>Category:</strong> {selectedExpense.category}</p>
          <p style={{ color: theme === 'dark' ? 'white' : 'black' }}><strong>Added By:</strong> {selectedExpense.userName} ({selectedExpense.userEmail})</p>
          <p style={{ color: theme === 'dark' ? 'white' : 'black' }}><strong>Date:</strong> {new Date(selectedExpense.date).toLocaleDateString()}</p>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ExpenseLogging;
