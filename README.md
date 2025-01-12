
# Personal_finance-tracker

The Personal Finance Tracker is a web application designed to help users manage their 
finances effectively. It provides tools to track income, expenses, and savings in real-time, 
allowing users to set financial goals and monitor their progress. The application ensures 
data security, seamless user experience, and accessibility across devices. It also integrates 
with Firebase services for storage, real-time updates, and notifications. 


2. Essential Requirements
   
    2.1 Functional Requirements
     - User Authentication: 
  Users will log in using Google or email/password through Firebase Authentication.
    - Expense Logging: 
  Users can log their daily expenses, categorize them (e.g., food, rent, entertainment), and 
  attach images of receipts.
    - Budget Management: 
  Users can set monthly budgets for different categories and track their spending against 
  these budgets in real-time.
    - Savings Tracking: 
  Users can set savings goals and monitor progress.
    - Report Generation: 
  Visual charts and reports will provide insights into spending patterns over a week, month, 
  or year.
    - Notifications: 
  Firebase Functions will send reminders for bill payments, monthly savings targets, or 
  exceeding a budget.
    - Media Storage: 
  Receipt images or other financial documents will be stored securely using Firebase 
  Storage.

    2.2 Non-Functional Requirements - Remote Hosting: 
The application will be hosted on a server, accessible to anyone. 
    - Responsiveness: 
The app will be responsive, ensuring usability on desktops.
    - Data Security: 
User data will be securely stored and transmitted using Firebase's security protocols.


3. Actors
   - End Users: 
Individuals who log in to track their finances and manage their budgets.
   - System Admins: 
Responsible for maintaining and updating the backend services (Firebase) and ensuring 
data integrity.


4. Implementation Details
    - Frontend Framework: 
React.js for building an interactive and responsive user interface.
    - Backend Services: 
Firebase services including Authentication, Firestore (for real-time database), Storage, and 
Functions.
    - Database Structure:
      - Users Collection: Stores user profile data (name, email, etc.).
      - Expenses Collection: Logs expense details (amount, category, date, receipt).
      - Budgets Collection: Stores budget limits for each category.
      - Savings Collection: Tracks user-defined savings goals and progress.
    - Notifications: 
Firebase Functions will automate email notifications and reminders.

5. Future Enhancements
     - Integration with bank APIs for automated transaction imports.
     - Advanced analytics using machine learning for financial advice. - Multi-currency support for global users.


