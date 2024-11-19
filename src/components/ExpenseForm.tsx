// Formulario para agregar gastos

import { useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";





export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0) // el dinero(cantidad) que ya estaba disponible en el form el que quieres editar
    const { dispatch, state, remaningBudget } = useBudget()

    // Editando
    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, } = e.target
        // Verifica si el amount es un number
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value // el + convierne a numero los string

        })
    }

    const handleChangeDate = (value: Value) => {


        setExpense({
            ...expense,
            date: value
        })

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //Validar object.value convierne un objeto como lo que esta adentro de const [expense, setExpense] y lo transforma en arreglo
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        //Validar que no me pase del limite

        if ((expense.amount - previousAmount) > remaningBudget) { // la cantidad nueva menos la cantidad que estaba es mayor a lo que quedaba disponible?
            setError('Presupuesto alcanzado')
            return
        }
        // Agregar o actualizar el gasto
        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: "add-expense", payload: { expense } })
        }


        // Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)

    }




    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? 'Guardar Cambio': 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error} </ErrorMessage>}

            <div className="flex flex-col gap-2">

                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto:
                </label>
                <input type="text" id="expenseName" placeholder="Agrega el Nombre del gasto" className="bg-slate-100 p-2 " name="expenseName" onChange={handleChange} value={expense.expenseName} />
            </div>
            <div className="flex flex-col gap-2">

                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>
                <input type="number" id="amount" placeholder="Agrega la cantidad del gasto" className="bg-slate-100 p-2 " name="amount" onChange={handleChange} value={expense.amount} />
            </div>

            <div className="flex flex-col gap-2">

                <label htmlFor="category" className="text-xl">
                    Categorias:
                </label>
                <select id="category" className="bg-slate-100 p-2 " name="category" onChange={handleChange} value={expense.category}  >
                    <option value=""> -- Seleccione -- </option>
                    {categories.map(category => (
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
                <DatePicker onChange={handleChangeDate} className="bg-slate-200 p-2 border-0 " value={expense.date} />
            </div>
            <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value={state.editingId ? 'Guardar Cambio': 'Registrar Gastos'} />

        </form>
    )
}
