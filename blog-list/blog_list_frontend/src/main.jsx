import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import NotificationProvider from './context/NotificationContext'
import UserLoggedProvider from './context/UserLoggedContext'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserLoggedProvider>
        <App />
      </UserLoggedProvider>
    </NotificationProvider>
  </QueryClientProvider>
)
