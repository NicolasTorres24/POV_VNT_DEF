import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import jsonData from '../json/META.json';

export function ProjectCrud() {
  // Hooks para la navegación y obtención de parámetros de URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados principales
  const [data, setData] = useState([]); // Almacena los datos de la tabla
  const [loading, setLoading] = useState(true); // Control del estado de carga
  const [editingCell, setEditingCell] = useState(null); // Control de celda en edición
  
  // Efecto para cargar los datos iniciales del JSON
  useEffect(() => {
    try {
      setData(jsonData); // Carga los datos del JSON importado
      setLoading(false); // Desactiva el estado de carga
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      setLoading(false);
      toast.error('Error al cargar los datos');
    }
  }, []); // El array vacío indica que solo se ejecuta al montar el componente

  // Función para obtener dinámicamente las columnas del JSON
  const getColumns = () => {
    if (data.length === 0) return [];
    // Obtiene todas las claves del primer objeto excepto 'id'
    return Object.keys(data[0]).filter(key => key !== 'id');
  };

  // Manejadores de eventos para la edición de celdas
  const handleCellClick = (rowIndex, column) => {
    setEditingCell({ rowIndex, column }); // Activa el modo edición para la celda
  };

  const handleCellChange = (rowIndex, column, value) => {
    const newData = [...data];
    newData[rowIndex][column] = value; // Actualiza el valor en la celda
    setData(newData);
  };

  // Función para añadir una nueva fila
  const handleAddRow = () => {
    const newId = Math.max(...data.map(item => item.id)) + 1; // Genera nuevo ID
    const newRow = { id: newId };
    // Crea una fila vacía con todas las columnas necesarias
    getColumns().forEach(column => {
      newRow[column] = '';
    });
    setData([...data, newRow]);
  };

  // Función para eliminar una fila
  const handleDeleteRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  // Función para guardar cambios
  const handleSave = () => {
    console.log('Datos actualizados:', data);
    toast.success('Cambios Guardados');
    navigate('/');
  };

  // Función para renderizar el contenido de cada celda
  const renderCell = (row, rowIndex, column) => {
    const value = row[column];
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.column === column;

    if (isEditing) {
      // Renderiza un input si la celda está en modo edición
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => handleCellChange(rowIndex, column, e.target.value)}
          onBlur={() => setEditingCell(null)}
          autoFocus
          className="w-full p-1 border rounded"
        />
      );
    }

    // Renderiza el valor normal si no está en edición
    return (
      <div
        onClick={() => handleCellClick(rowIndex, column)}
        className="cursor-pointer p-2 hover:bg-gray-50"
      >
        {value}
      </div>
    );
  };

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">Cargando datos...</p>
    </div>
  );

  // Renderizado principal del componente
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Barra superior con botones de navegación y título */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-2" />
              Volver al Inicio
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Tabla ODS {id}</h1>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Save size={20} className="mr-2" />
              Guardar Cambios
            </button>
          </div>

          {/* Tabla principal */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Encabezados de la tabla */}
              <thead className="bg-gray-50">
                <tr>
                  {getColumns().map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              {/* Cuerpo de la tabla */}
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr key={row.id}>
                    {getColumns().map((column) => (
                      <td key={`${row.id}-${column}`} className="px-6 py-4 whitespace-nowrap">
                        {renderCell(row, rowIndex, column)}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteRow(rowIndex)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón para añadir nueva fila */}
          <div className="mt-4">
            <button
              onClick={handleAddRow}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <Plus size={20} className="mr-2" />
              Añadir Fila
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}