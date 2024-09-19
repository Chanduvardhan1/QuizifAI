import React from 'react';
import { AuthProvider } from "../src/Authcontext/AuthContext.jsx";
import AppRoutes from './AppRoutes.jsx';
    function App() {
      return (
        <>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </>
      );
    }

export default App;