import React from 'react'
import Routing from '../Routing';
import { AuthProvider } from '../useAuth';

function App() {
  return (
    <AuthProvider>
        <Routing/>
    </AuthProvider>
  )
}

export default App;
