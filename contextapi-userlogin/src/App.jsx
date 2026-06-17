import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import UserContextProvider from './context/UserContextProvider';
import Profile from './components/Profile';
import Login from './components/Login';
import ThemeBtn from './components/ThemeBtn';

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    const html = document.querySelector('html');
    html.classList.remove("light", "dark");
    html.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <UserContextProvider>
        <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-white dark:bg-gray-900 transition-colors duration-300">
          <ThemeBtn />
          <Login />
          <Profile />
        </div>
      </UserContextProvider>
    </ThemeProvider>
  );
}
export default App;