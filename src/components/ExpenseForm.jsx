import { useContext, useState } from 'react'
import { categories } from '../data/categories'
import { BudgetDispatchContext } from '../context/BudgetContexts'
import ErrorMessage from './ErrorMessage'

export const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date(),
  })

  const [error, setError] = useState('')
  const dispatch = useContext(BudgetDispatchContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    })
  }

  const handleChangeDate = (value) => {
    setExpense({
      ...expense,
      date: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.values(expense).includes('')) {
      setError('Todos los Campos son Obligatorios')
      return
    }

    dispatch({ type: 'add-expense', payload: { expense } })

    setError('')
    setExpense({
      expenseName: '',
      amount: 0,
      category: '',
      date: new Date(),
    })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo gasto
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la Cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:
        </label>
        <input
          type="date"
          className="bg-slate-100 p-2 border-0"
          value={expense.date.toISOString().split('T')[0]}
          onChange={(e) => handleChangeDate(new Date(e.target.value))}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value="Registrar gasto"
      />
    </form>
  )
}
