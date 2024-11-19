// Hook personalizado para mostrar el context


import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

//este conponente sirve para poder ocupar el context con useBudget
export const useBudget = () => {
    const context = useContext(BudgetContext)
     if(!context) {
        throw new Error('useBudget must be used within a budgetProvider')
     }
    return context
}