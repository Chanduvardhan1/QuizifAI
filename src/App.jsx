import React from 'react';
import { AuthProvider } from "../src/Authcontext/AuthContext.jsx";
import AppRoutes from './AppRoutes.jsx';
import { Provider } from 'react-redux';
import { Store } from './Store.jsx';

    function App() {
      console.log('env', process.env.NODE_ENV);
      return (
        <>
          <Provider store={Store}>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </Provider>
        </>
      );
    }

export default App;