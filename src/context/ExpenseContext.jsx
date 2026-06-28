import { createContext, useReducer, useContext, useEffect } from "react";

const savedTransactions = localStorage.getItem("transactions");
const savedBudgets = localStorage.getItem("budgets");

const initialState = {
  transactions: savedTransactions ? JSON.parse(savedTransactions) : [],
  budgets: savedBudgets ? JSON.parse(savedBudgets) : {},
};

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_BUDGET":
      return {
        ...state,
        budgets: {
          ...state.budgets,
          [action.payload.category]: action.payload.limit,
        },
      };

    case "DELETE_BUDGET":
      const updatedBudgets = { ...state.budgets };
      delete updatedBudgets[action.payload];
      return {
        ...state,
        budgets: updatedBudgets,
      };

    default:
      return state;
  }
}

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(state.budgets));
  }, [state.budgets]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  return useContext(ExpenseContext);
}
