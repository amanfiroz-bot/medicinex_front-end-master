import { createContext, useState, useEffect } from 'react';
import JWTDecoder from './JWTDecoder';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser(JWTDecoder(storedToken));
      setToken(storedToken);
    }
  }, []);
  
  const login = (newToken) => {
    setToken(newToken);
    setUser(JWTDecoder(newToken));
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };
  const isAuthenticated = token !== '';
  return (
      <AuthContext.Provider value={{ token,user,login, logout, isAuthenticated }}>
      {children}
      </AuthContext.Provider>
  );
};
export {AuthContext, AuthProvider };