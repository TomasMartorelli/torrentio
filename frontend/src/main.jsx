import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <main className='w-100 flex justify-center items-center'>
        <div className="w-100 container bg-neutral-800">
          <App />
        </div>
      </main>
    </BrowserRouter>
  </StrictMode>,
)