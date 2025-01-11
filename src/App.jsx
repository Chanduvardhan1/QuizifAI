import React, { useEffect } from 'react';
import { AuthProvider } from "../src/Authcontext/AuthContext.jsx";
import AppRoutes from './AppRoutes.jsx';
import { Provider } from 'react-redux';
import Store from './Store.jsx';
import './App.css';

    function App() {
      useEffect(() => {
        // Add an event listener to disable right-click
        const disableRightClick = (e) => {
            e.preventDefault();
        };

        document.addEventListener('contextmenu', disableRightClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('contextmenu', disableRightClick);
        };
    }, []);
    useEffect(() => {
      const disablePrintScreen = (e) => {
          if (e.key === 'PrintScreen') {
              e.preventDefault();
              alert('Screenshots are disabled on this page.');
              // Optionally, you can clear the clipboard content
              navigator.clipboard.writeText('');
          }
      };

      // Attach the event listener
      document.addEventListener('keydown', disablePrintScreen);

      // Clean up the event listener on unmount
      return () => {
          document.removeEventListener('keydown', disablePrintScreen);
      };
  }, []);
  useEffect(() => {
    const detectDevTools = () => {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: () => {
                alert('Developer tools detected. Screenshots are disabled.');
            },
        });
        console.log(element);
    };

    detectDevTools();
}, []);

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