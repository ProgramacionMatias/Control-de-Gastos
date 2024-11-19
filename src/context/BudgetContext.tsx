// Context para ocupar los estados de manera global en este caso el useReducer

import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { budgetReducer, initialState, BudgetState, BudgetActions } from "../reducers/budget-reducer"


type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number,
    remaningBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

// crear context. createcontext permite crear el context
export const BudgetContext = createContext<BudgetContextProps>(null!)

// para decir que el provider tenga state y dispatch tenemos que crear el type BudgetContextProps
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    // el use reducer nos da acceso al budget-reducer para poder definir y mandar a llamar las acciones
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    const remaningBudget = state.budget - totalExpenses

    // aqui conectar el context con el provider
    //Todo lo que esta dentro del provider es lo que se va a compartir
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remaningBudget
            }}
        >
            {children}

        </BudgetContext.Provider>

    )
}

