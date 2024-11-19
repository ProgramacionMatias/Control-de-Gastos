import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  //aqui conectar el context al rodear el app y lo puede usar globalmente
  <StrictMode>
    
    <BudgetProvider>
      <App />
    </BudgetProvider>

  </StrictMode>,
)
