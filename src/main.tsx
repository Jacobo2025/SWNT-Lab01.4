import React from 'react'
import ReactDOM from 'react-dom/client'
import { EmissionsTracker } from './components/features/EmissionsTracker'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EmissionsTracker />
  </React.StrictMode>,
)
