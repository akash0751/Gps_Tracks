import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm';
import GpsApp from './GpsApp'; // Your existing GPS Tracker component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <button
            onClick={handleLogout}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
          <GpsApp />
        </div>
      ) : (
        <AuthForm onAuth={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;





