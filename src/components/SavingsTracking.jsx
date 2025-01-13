import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const SavingsTracking = () => {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [addAmount, setAddAmount] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleAddGoal = async () => {
    if (!goalName || !targetAmount || isNaN(targetAmount) || isNaN(currentAmount)) {
      setErrorMessage("Please fill out all fields correctly.");
      return;
    }

    const newGoal = {
      goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      currency,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, 'savings'), newGoal);
      setGoals([...goals, { ...newGoal, id: docRef.id }]);
      setGoalName("");
      setTargetAmount("");
      setCurrentAmount("");
      setCurrency("USD");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding goal: ", error);
      setErrorMessage("Failed to add the goal. Please try again.");
    }
  };

  const handleUpdateProgress = async (index, amount) => {
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Enter a valid positive number to add.");
      return;
    }

    const goal = goals[index];
    const newCurrentAmount = goal.currentAmount + parseFloat(amount);

    if (newCurrentAmount > goal.targetAmount) {
      setErrorMessage("Amount exceeds the target. Please add a smaller amount.");
      return;
    }

    try {
      const updatedGoal = {
        ...goal,
        currentAmount: newCurrentAmount,
      };

      await updateDoc(doc(db, 'savings', goal.id), {
        currentAmount: newCurrentAmount,
      });

      const updatedGoals = [...goals];
      updatedGoals[index] = updatedGoal;
      setGoals(updatedGoals);
      setAddAmount({ ...addAmount, [index]: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating progress: ", error);
      setErrorMessage("Failed to update progress. Please try again.");
    }
  };

  const handleAddAmountChange = (index, value) => {
    setAddAmount({ ...addAmount, [index]: value });
  };

  const textStyle = {
    color: theme === "dark" ? "white" : "black",
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Savings Tracking</h2>
      {errorMessage && <p style={{ color: "red", textAlign: 'center' }}>{errorMessage}</p>}

      <div>
        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Current Amount"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RON">RON</option>
        </select>
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Savings Goals</h3>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          {goals.map((goal, index) => (
            <div
              key={goal.id}
              style={{
                marginBottom: '15px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px',
              }}
            >
              <p style={textStyle}><strong>Goal:</strong> {goal.goalName}</p>
              <p style={textStyle}>
                <strong>Target Amount:</strong> {goal.targetAmount} {goal.currency}
              </p>
              <p style={textStyle}>
                <strong>Current Amount:</strong> {goal.currentAmount} {goal.currency}
              </p>
              <p style={textStyle}>
                <strong>Remaining:</strong> {goal.targetAmount - goal.currentAmount} {goal.currency}
              </p>

              <input
                type="number"
                placeholder="Add Amount"
                value={addAmount[index] || ""}
                onChange={(e) => handleAddAmountChange(index, e.target.value)}
              />
              <button onClick={() => handleUpdateProgress(index, addAmount[index])}>
                Update Progress
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingsTracking;
    </div>
  );
};

export default SavingsTracking;
