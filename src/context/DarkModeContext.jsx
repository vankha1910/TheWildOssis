import React, { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();
const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('DarkModeContext was used outside of context Provider');
  }
  return context;
};

export { useDarkMode };
export default DarkModeProvider;
