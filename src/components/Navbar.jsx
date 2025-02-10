import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

export function Navbar() {
  const { user, logout, menuOptions } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSubmenu = (key) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  const mapMenuOptions = (menuOptions) => {
    const parentMenus = [];
    const childMenus = [];

    menuOptions.forEach((opcion) => {
      if (opcion.opcioN_PADRE === null) {
        parentMenus.push({
          ...opcion,
          subopciones: []
        });
      } else {
        childMenus.push(opcion);
      }
    });

    parentMenus.forEach((parent) => {
      childMenus.forEach((child) => {
        if (child.opcioN_PADRE === parent.iD_OPCIONMENU) {
          parent.subopciones.push(child);
        }
      });
    });

    return parentMenus;
  };

  const parentMenus = mapMenuOptions(menuOptions);

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg transition-transform duration-200 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-l font-bold text-black-600">Portal Operacional Vantrust</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.username}</span>
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

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/10 transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-[64px] left-0 w-72 bg-white shadow-lg transition-transform duration-200 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-100`}
      >
        <div className="py-2">
          {parentMenus.length > 0 ? (
            parentMenus.map((opcion) => (
              <div key={opcion.iD_OPCIONMENU} className="border-b border-gray-100 last:border-none">
                <button
                  onClick={() => toggleSubmenu(opcion.iD_OPCIONMENU)}
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-800">{opcion.opcionmenu}</span>
                  <span className="text-gray-400">
                    {openSubmenu === opcion.iD_OPCIONMENU ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openSubmenu === opcion.iD_OPCIONMENU ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  {opcion.subopciones?.map((sub) => (
                    <button
                      key={sub.iD_OPCIONMENU}
                      onClick={() => navigate(sub.link)}
                      className="block px-12 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                    >
                      {sub.opcionmenu}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500">No hay opciones de menú disponibles</p>
          )}
        </div>
      </div>
    </nav>
  );
}