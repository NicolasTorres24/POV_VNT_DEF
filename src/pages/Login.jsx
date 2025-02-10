import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const API_KEY = '6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN';

  // 🔹 Obtener el usuario de Windows al cargar la página
  useEffect(() => {
    const fetchWindowsUser = async () => {
      try {
        const response = await axios.get('http://localhost:5279/api/Grupos/GetWindowsUser');
        if (response.status === 200) {
          setUsername(response.data); // Establecer el usuario de Windows por defecto
        }
      } catch (error) {
        console.error('❌ No se pudo obtener el usuario de Windows:', error);
      }
    };

    fetchWindowsUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToSend = username.trim() || await axios.get('http://localhost:5279/api/Grupos/GetWindowsUser').then(res => res.data);

      const responseGet = await axios.get('http://localhost:5279/api/Grupos/GetUserGroupsAD', {
        params: { username: userToSend, password },
        headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' }
      });

      if (responseGet.status === 200 && Array.isArray(responseGet.data) && responseGet.data.length > 0) {
        let gruposAPI = responseGet.data;
        let gruposUnicos = [];
        let seen = new Set();

        for (let grupo of gruposAPI) {
          if (!seen.has(grupo.iD_Grupo)) {
            seen.add(grupo.iD_Grupo);
            gruposUnicos.push(grupo);
          }
        }

        if (gruposUnicos.length === 0) {
          toast.error('No hay grupos válidos para enviar.');
          return;
        }

        let payload = gruposUnicos.map(grupo => ({
          ID_GRUPO: grupo.iD_Grupo,
          grupo: grupo.grupo
        }));

        const responsePost = await axios.post(
          'http://localhost:5279/api/Grupos/TraeOpcionesMenuUsuario?Id_sistema=19',
          payload,
          { headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' } }
        );

        if (responsePost.status === 200 && Array.isArray(responsePost.data)) {
          console.log('📩 Opciones de menú obtenidas:', responsePost.data);

          const opcionesUnicas = [];
          const seenMenus = new Set();

          responsePost.data.forEach((opcion) => {
            if (!seenMenus.has(opcion.opcionmenu)) {
              seenMenus.add(opcion.opcionmenu);
              opcionesUnicas.push(opcion);
            }
          });

          login(userToSend, password, opcionesUnicas);
          navigate('/'); // Redirigir al home
        } else {
          toast.error('Error al obtener las opciones del menú');
        }
      } else {
        toast.error('No se encontraron grupos para el usuario');
      }
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      toast.error('Las credenciales no son válidas');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Ingresa tus Datos</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                disabled // Campo deshabilitado
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
