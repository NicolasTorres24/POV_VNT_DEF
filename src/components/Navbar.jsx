import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, ChevronDown, ChevronUp, Layers, Target, Monitor } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = {
    Operaciones: {
      icon: <Layers className="w-5 h-5" />,
      items: ['Gestión de Proyectos', 'Control de Calidad', 'Logística'],
    },
    Marketing: {
      icon: <Target className="w-5 h-5" />,
      items: ['Redes Sociales', 'Email Marketing', 'SEO'],
    },
    Informática: {
      icon: <Monitor className="w-5 h-5" />,
      items: ['Desarrollo Web', 'Soporte Técnico', 'Seguridad'],
    },
  };

  const toggleSubmenu = (key) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Title */}
          <div className="flex items-center">
            <h1 className="text-l font-bold text-black-600">Portal Operacional Vantrust</h1>
          </div>

          {/* Menu and Actions */}
          <div className="flex items-center gap-4">
            {/* Burger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg transition-transform duration-200 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut size={20} />
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/10 transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-[64px] right-0 w-72 bg-white shadow-lg transition-transform duration-200 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } h-[calc(100vh-64px)] overflow-y-auto border-l border-gray-100`}
      >
        <div className="py-2">
          {Object.entries(menuItems).map(([category, { icon, items }]) => (
            <div key={category} className="border-b border-gray-100 last:border-none">
              <button
                onClick={() => toggleSubmenu(category)}
                className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">{icon}</span>
                  <span className="font-medium text-gray-800">{category}</span>
                </div>
                <span className="text-gray-400">
                  {openSubmenu === category ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </button>
              {/* Submenu */}
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openSubmenu === category ? 'max-h-48' : 'max-h-0'
                }`}
              >
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-12 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
