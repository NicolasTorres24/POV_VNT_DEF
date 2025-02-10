import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]); // ✅ Guardamos las opciones del menú

  const login = async (username, password, opcionesMenu) => {
    if (username && password.length >= 6) {
      setUser({ username, isAuthenticated: true });
      setMenuOptions(opcionesMenu); // ✅ Guardamos las opciones del menú en el contexto
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    setUser(null);
    setMenuOptions([]); // Limpiamos opciones del menú al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, menuOptions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
