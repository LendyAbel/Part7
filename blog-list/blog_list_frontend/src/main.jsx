import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import NotificationProvider from './context/NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserLoggedProvider from './context/UserLoggedContext'

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
