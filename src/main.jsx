import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const query = new QueryClient()
createRoot(document.getElementById('root')).render(
   <QueryClientProvider client={query}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </QueryClientProvider>
)
