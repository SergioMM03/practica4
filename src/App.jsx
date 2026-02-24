import { useContext } from 'react'
import { BudgetForm } from './components/BudgetForm'
import { BudgetTracker } from './components/BudgetTracker'
import ExpenseModal from './components/ExpenseModal'
import { BudgetStateContext } from './context/BudgetContexts'

function App() {
  const { budget } = useContext(BudgetStateContext)
  const isValidBudget = Number(budget) > 0

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>

      <main className="max-w-3xl mx-auto py-10 px-4">
        <section className="bg-white shadow-lg rounded-lg p-10">
          {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
        </section>

        {isValidBudget && (
          <section aria-label="acciones-de-gasto" className="relative">
            <ExpenseModal />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
