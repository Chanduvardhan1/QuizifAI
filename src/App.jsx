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
      const handleKeyDown = (event) => {
        if (event.key === "PrintScreen") {
          alert("Screenshots are not allowed!");
          // Optionally, clear sensitive content
          document.body.style.display = "none"; // Hide content temporarily
          setTimeout(() => (document.body.style.display = "block"), 1000);
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
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