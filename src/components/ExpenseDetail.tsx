// Logica para mostrar los agregados

import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"


type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget()

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  const leadingAction = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })}>
        eliminar
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={30} leadingActions={leadingAction()} trailingActions={trailingActions()}>

        <div className="bg-white shadow-lg w-full border-b p-10 border-gray-200 flex gap-5 items-center">
          <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gasto" className="w-20" />
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay
            amount={expense.amount}
          />

        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
