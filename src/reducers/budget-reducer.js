export const initialState = {
  budget: 0,
  modal: false,
  expenses: [],
}

export const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add-budget':
      return { ...state, budget: action.payload.budget }
    case 'show-modal':
      return { ...state, modal: true }
    case 'close-modal':
      return { ...state, modal: false }
    case 'add-expense':
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
        modal: false,
      }
    case 'reset-app':
      return initialState
    default:
      return state
  }
}
