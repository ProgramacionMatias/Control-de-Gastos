//Cuanto agregamos un presupuesto nos muestra este componente que muestra detalles prepuesto total, disponible, gastado
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"





export default function BudgetTracker() {

  const { state, totalExpenses, remaningBudget, dispatch } = useBudget()
  const precentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={precentage}
          styles={buildStyles({
            pathColor: precentage === 100 ? '#DC2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textSize: 10,
            textColor:'#3b82f6'
          })}
          text={`${precentage}% Gastado`}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() =>dispatch({ type: 'restart-app'}) }
        >
          Resetear App
        </button>

        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay
          label="Disponible"
          amount={remaningBudget}
        />

        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}
