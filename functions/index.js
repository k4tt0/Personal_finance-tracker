const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendBillPaymentReminder = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const users = await admin.firestore().collection('users').get();
  users.forEach(user => {
    const email = user.data().email;
    // Logic to send email reminder for bill payments
  });
  return null;
});

exports.sendSavingsTargetReminder = functions.pubsub.schedule('every month').onRun(async (context) => {
  const users = await admin.firestore().collection('users').get();
  users.forEach(user => {
    const email = user.data().email;
    // Logic to send email reminder for monthly savings targets
  });
  return null;
});

exports.sendBudgetExceedingAlert = functions.firestore.document('expenses/{expenseId}').onCreate(async (snap, context) => {
  const expense = snap.data();
  const userId = expense.userId;
  const user = await admin.firestore().collection('users').doc(userId).get();
  const email = user.data().email;
  // Logic to check if budget is exceeded and send email alert
  return null;
});
