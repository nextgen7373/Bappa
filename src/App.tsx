import React from 'react'
import Router from './routes/Router'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  )
}
