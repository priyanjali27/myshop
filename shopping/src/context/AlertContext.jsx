import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const AlertContext = createContext();

// 2. Create the Provider Component
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  // Helper function to trigger alerts from anywhere
  const showAlert = (message, type = 'success', duration = 4000) => {
    setAlert({ show: true, message, type });

    // Auto-hide alert for success messages (errors can be dismissed manually)
    if (type === 'success') {
      setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, duration);
    }
  };

  const closeAlert = () => setAlert(prev => ({ ...prev, show: false }));

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* Global Bootstrap Alert Render Component */}
      {alert.show && (
        <div 
          className="alert-toast-container" 
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1060,
            width: '100%',
            maxWidth: '500px',
            padding: '0 15px'
          }}
        >
          <div 
            className={`alert alert-${alert.type} alert-dismissible fade show shadow-lg`} 
            role="alert"
          >
            <div className="d-flex align-items-center">
              {alert.type === 'success' ? (
                <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              ) : (
                <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              )}
              <div>
                <strong>{alert.type === 'success' ? 'Success!' : 'Error!'}</strong> {alert.message}
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={closeAlert} 
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

// 3. Custom hook for clean usage in components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
