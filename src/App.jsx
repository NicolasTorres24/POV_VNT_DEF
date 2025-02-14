import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ProjectCrud } from './pages/ProjectCrud';
import { SistemaForm } from './components/sistemas/ins_sistemas/ins_sistemas';
import { SistemaForm_upd } from './components/sistemas/upd_sistemas/upd_sistemas';
import { SelGrupo } from './components/grupo/sel_grupo/sel_grupo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/components/grupo/sel_grupo"
              element={
                <ProtectedRoute>
                  <SelGrupo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProtectedRoute>
                  <ProjectCrud />
                </ProtectedRoute>
              }
            />
            <Route
              path="/components/sistemas/ins_sistemas/:id"
              element={
                <ProtectedRoute>
                  <SistemaForm />
                </ProtectedRoute>
              }            
            />
            <Route
              path="/components/sistemas/upd_sistemas/:id"
              element={
                <ProtectedRoute>
                  <SistemaForm_upd />
                </ProtectedRoute>
              }            
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;