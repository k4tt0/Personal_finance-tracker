import React, { useState } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const SavingsTracking = () => {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleAddGoal = async () => {
    const newGoal = {
      goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      currency,
      createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'savings'), newGoal);
    setGoals([...goals, { ...newGoal, id: docRef.id }]);
    setGoalName("");
    setTargetAmount("");
    setCurrentAmount("");
    setCurrency("USD");
  };

  const handleUpdateProgress = async (index, amount) => {
    const updatedGoals = goals.map((goal, i) => {
      if (i === index) {
        const updatedGoal = {
          ...goal,
          currentAmount: goal.currentAmount + parseFloat(amount)
        };
        updateDoc(doc(db, 'savings', goal.id), updatedGoal);
        return updatedGoal;
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  return (
    <div>
      <h2>Savings Tracking</h2>
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
      <div>
        <h3>Savings Goals</h3>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>
              <p>Goal: {goal.goalName}</p>
              <p>Target Amount: {goal.targetAmount} {goal.currency}</p>
              <p>Current Amount: {goal.currentAmount} {goal.currency}</p>
              <p>Remaining: {goal.targetAmount - goal.currentAmount} {goal.currency}</p>
              <input
                type="number"
                placeholder="Add Amount"
                onChange={(e) => handleUpdateProgress(index, e.target.value)}
              />
              <button onClick={() => handleUpdateProgress(index, currentAmount)}>Update Progress</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavingsTracking;