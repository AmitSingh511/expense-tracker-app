# 💰 SpendSmart — Expense Tracker

A full-featured personal expense tracker built with React. Track income and expenses, visualize spending with charts, set category budgets, and filter through your transaction history — all with data that persists across sessions.

🔗 **Live demo:** https://AmitSingh511.github.io/expense-tracker-app/

---

## ✨ Features

- **Add & delete transactions** — income or expense, with category, description, and date
- **Dashboard overview** — total balance, total income, and total expenses at a glance
- **Data visualization**
  - Bar chart — monthly income vs expenses
  - Pie chart — spending breakdown by category
  - Line chart — income vs expense trend over time
- **Budget tracking** — set a monthly limit per category with a progress bar that turns red when you overspend
- **Search & filters** — filter transactions by description, category, and type
- **Reports page** — savings rate and a deeper visual breakdown
- **Persistent storage** — all data is saved to `localStorage`, so it survives page refreshes
- **Multi-page navigation** — built with React Router, with an active-link highlighted navbar

---

## 🛠️ Built With

- [React](https://react.dev/) (Vite)
- [React Router](https://reactrouter.com/) — client-side routing
- [Recharts](https://recharts.org/) — bar, pie, and line charts
- [uuid](https://www.npmjs.com/package/uuid) — unique transaction IDs
- [date-fns](https://date-fns.org/) — date formatting
- Context API + `useReducer` — global state management
- Plain CSS — one stylesheet per component/page

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation with active-link highlighting
│   ├── PieChart.jsx        # Category spending breakdown
│   ├── BarChart.jsx        # Monthly income vs expense bars
│   └── LineChart.jsx       # Income vs expense trend over time
├── pages/
│   ├── Dashboard.jsx       # Summary cards + bar & pie charts
│   ├── Transactions.jsx    # Full list with search/category/type filters
│   ├── AddExpense.jsx      # Controlled form to add a transaction
│   ├── Budget.jsx          # Set & track per-category budget limits
│   └── Reports.jsx         # Savings rate, line chart, category breakdown
├── context/
│   └── ExpenseContext.jsx  # Global state — transactions & budgets, via useReducer
├── App.jsx                 # Routes + ExpenseProvider wrapper
└── main.jsx
```

---

## 🧠 How It Works

All transaction and budget data lives in a single global state object, managed with `useReducer` and shared across the app via the Context API (`ExpenseContext.jsx`). Every page reads directly from this context — no prop drilling.

```
ADD_TRANSACTION    → adds a new transaction to the list
DELETE_TRANSACTION → removes a transaction by id
SET_BUDGET         → sets or updates a category's monthly limit
```

Two `useEffect` hooks keep `transactions` and `budgets` in sync with `localStorage`, so nothing is lost on refresh.

Numbers like total balance, income, expenses, and savings rate are never stored directly — they're **derived** on the fly from the transactions array using `.filter()` and `.reduce()`, which keeps the data always accurate and avoids state duplication.

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/AmitSingh511/expense-tracker-app.git
cd expense-tracker-app
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📦 Deployment

This project deploys to GitHub Pages using the `gh-pages` package.

```bash
npm run deploy
```

This builds the project and pushes the `dist` folder to the `gh-pages` branch. Note: `npm run deploy` must be run manually after every change — there's no auto-deploy on `git push`.

---

## 🗺️ Possible Future Additions

- Edit existing transactions
- Export transactions to CSV
- Dark mode
- Multi-currency support
- Recurring transactions

---

## 👤 Author

**Amit Singh** — [GitHub @AmitSingh511](https://github.com/AmitSingh511)

---

## 📝 License

This project is open source and available for learning purposes.
