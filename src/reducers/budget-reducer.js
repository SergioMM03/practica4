const initialBudget = () => {
  if (typeof window === 'undefined') return 0

  const localStorageBudget = window.localStorage.getItem('budget')
  const parsedBudget = Number.parseFloat(localStorageBudget ?? '0')
  return Number.isFinite(parsedBudget) ? parsedBudget : 0
}

const localStorageExpenses = () => {
  if (typeof window === 'undefined') return []

  const expenses = window.localStorage.getItem('expenses')
  if (!expenses) return []

  try {
    const parsedExpenses = JSON.parse(expenses)
    return Array.isArray(parsedExpenses) ? parsedExpenses : []
  } catch {
    return []
  }
}

export const initialState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: '',
  currentCategory: '',
}

export const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add-budget':
      return { ...state, budget: action.payload.budget }
    case 'show-modal':
      return { ...state, modal: true }
    case 'close-modal':
      return { ...state, modal: false, editingId: '' }
    case 'add-expense':
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload.expense, id: Date.now() }],
        modal: false,
      }
    case 'remove-expense':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
      }
    case 'get-expense-by-id':
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      }
    case 'update-expense':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id ? action.payload.expense : expense,
        ),
        modal: false,
        editingId: '',
      }
    case 'add-filter-category':
      return { ...state, currentCategory: action.payload.categoryId }
    case 'reset-app':
      return {
        ...initialState,
        budget: 0,
        expenses: [],
      }
    default:
      return state
  }
}
