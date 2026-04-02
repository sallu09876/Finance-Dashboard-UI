import { createContext, useContext, useEffect, useReducer } from "react";
import { mockTransactions } from "../data/mockData";

const defaultFilters = {
  search: "",
  category: "All",
  type: "All",
  dateRange: { from: null, to: null },
  sortBy: "date",
  sortOrder: "desc"
};

const initialState = {
  transactions: mockTransactions,
  filters: defaultFilters,
  role: "viewer"
};

const storageKey = "finsight_app_state_v1";

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      if (state.role !== "admin") return state;
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "EDIT_TRANSACTION":
      if (state.role !== "admin") return state;
      return {
        ...state,
        transactions: state.transactions.map((txn) =>
          txn.id === action.payload.id ? { ...txn, ...action.payload } : txn
        )
      };
    case "DELETE_TRANSACTION":
      if (state.role !== "admin") return state;
      return { ...state, transactions: state.transactions.filter((txn) => txn.id !== action.payload) };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "RESET_FILTERS":
      return { ...state, filters: defaultFilters };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (baseState) => {
    try {
      const savedState = localStorage.getItem(storageKey);
      return savedState ? JSON.parse(savedState) : baseState;
    } catch {
      return baseState;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
