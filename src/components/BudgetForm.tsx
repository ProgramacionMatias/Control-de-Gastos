// Componente para ingregar presupuesto 

import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget() // este es el hooks useBudget.ts

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)//valueAsNumber el valor ingresado lo transforma a number
    }

    const isvalid = useMemo(() => { return isNaN(budget) || budget <= 0 }, [budget])

    // al dar click al submit del form guarda el numero ingresado en el reducers con dispatch
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2 "
                    placeholder="define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}

                />
            </div>

            <input

                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-40"
                disabled={isvalid}

            />
        </form>
    )
}
