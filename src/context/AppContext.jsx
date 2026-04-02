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
  role: "viewer",
  profile: {
    name: "Sarthak Rao",
    email: "sarthak.rao@example.com",
    avatar: null
  }
};

const storageKey = "finsight_app_state_v2";
/** Avatar stored separately so the main JSON blob stays small and under localStorage quota. */
const avatarStorageKey = "finsight_profile_avatar_v1";

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
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.payload } };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (baseState) => {
    try {
      const savedState = localStorage.getItem(storageKey);
      let avatarFromDedicatedKey = null;
      try {
        avatarFromDedicatedKey = localStorage.getItem(avatarStorageKey);
      } catch {
        /* ignore */
      }
      if (!savedState) {
        return avatarFromDedicatedKey
          ? { ...baseState, profile: { ...baseState.profile, avatar: avatarFromDedicatedKey } }
          : baseState;
      }
      const parsed = JSON.parse(savedState);
      const mergedProfile = { ...baseState.profile, ...(parsed.profile || {}) };
      const avatar =
        avatarFromDedicatedKey ?? mergedProfile.avatar ?? baseState.profile.avatar ?? null;
      return {
        ...baseState,
        ...parsed,
        filters: { ...defaultFilters, ...(parsed.filters || {}) },
        profile: { ...mergedProfile, avatar }
      };
    } catch {
      return baseState;
    }
  });

  useEffect(() => {
    try {
      const { profile, ...rest } = state;
      const { avatar, ...profileWithoutAvatar } = profile;
      localStorage.setItem(
        storageKey,
        JSON.stringify({ ...rest, profile: profileWithoutAvatar })
      );
      if (avatar) {
        localStorage.setItem(avatarStorageKey, avatar);
      } else {
        localStorage.removeItem(avatarStorageKey);
      }
    } catch (e) {
      console.warn("Failed to persist app state (storage may be full):", e);
    }
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
