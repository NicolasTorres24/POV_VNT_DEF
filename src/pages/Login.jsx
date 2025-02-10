import React, { useState } from 'react';
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

  const API_KEY = '6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN'; // API Key real

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Solicitud a la API GET para obtener los grupos del usuario
      const responseGet = await axios.get('http://localhost:5279/api/Grupos/GetUserGroupsAD', {
        params: { username },
        headers: { 
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json'
        }
      });
  
      if (responseGet.status === 200 && Array.isArray(responseGet.data) && responseGet.data.length > 0) {
        let gruposAPI = responseGet.data;
        console.log('✅ Grupos obtenidos:', gruposAPI);
  
        // 2️⃣ Filtrar duplicados usando un Set basado en iD_Grupo
        let gruposUnicos = [];
        let seen = new Set();
  
        for (let grupo of gruposAPI) {
          if (!seen.has(grupo.iD_Grupo)) {
            seen.add(grupo.iD_Grupo);
            gruposUnicos.push(grupo);
          }
        }
  
        console.log('✅ Grupos sin duplicados:', gruposUnicos);
  
        if (gruposUnicos.length === 0) {
          toast.error('No hay grupos válidos para enviar.');
          return;
        }
  
        // 3️⃣ Convertir claves a mayúsculas si es necesario
        let payload = gruposUnicos.map(grupo => ({
          ID_GRUPO: grupo.iD_Grupo,  // Verificar si la API requiere esta clave en mayúsculas
          grupo: grupo.grupo
        }));
  
        console.log('📩 Enviando a la API POST:', payload);
  
        // 4️⃣ Llamada a la API POST
        const responsePost = await axios.post(
          'http://localhost:5279/api/Grupos/TraeOpcionesMenuUsuario?Id_sistema=19',
          payload,
          {
            headers: { 
              'X-Api-Key': API_KEY,
              'Content-Type': 'application/json'
            }
          }
        );
  
        if (responsePost.status === 200) {
          // Al recibir una respuesta exitosa, ejecutar login
          login(username, password); // Ahora pasa tanto username como password
          navigate('/'); // Redirigir al home
        } else {
          toast.error('Error al obtener las opciones del menú');
        }
      } else {
        toast.error('No se encontraron grupos para el usuario');
      }
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      toast.error('Hubo un error al procesar los grupos');
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
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
