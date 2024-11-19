export type Expense = {
    id: string
    amount:number
    expenseName: string
    category: string
    date: Value
}

// lo mismo que tiene expense pero sin el id omit quita un valor
export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Catergory = {
   id:string
   name:string
   icon:string 
}