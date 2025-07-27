import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'



// The error occurs if the environment variable VITE_CLERK_PUBLISHABLE_KEY is not defined or not loaded correctly.
// Make sure you have a .env file in your project root with VITE_CLERK_PUBLISHABLE_KEY set, and that you restart your dev server after adding it.
// For debugging, let's log the value to see what is being picked up:
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Publishable Key:", PUBLISHABLE_KEY);
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key for clerk. Make sure VITE_CLERK_PUBLISHABLE_KEY is set in your .env file.");
}

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Router>
          <App />
        </Router>
      </ClerkProvider>
    </Provider>
  </PersistGate>
)
