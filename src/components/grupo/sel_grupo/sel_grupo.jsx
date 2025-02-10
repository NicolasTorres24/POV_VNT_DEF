import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft, X, Plus, Edit, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios'; // Importar Axios

export function  SelGrupo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state?.title;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5279/api/Grupos/GetGrupos?activo=1', {
          headers: {
            'accept': 'text/plain',
            'X-Api-Key': '6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN'
          }
        });
        setData(response.data); // Guardar los datos de la API
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
        toast.error('Error al cargar los datos');
      }
    };

    fetchData(); // Llamar a la función para obtener los datos
  }, []);

  useEffect(() => {
    const filtered = data.filter(item => {
      const nameMatch = item.nombre?.toLowerCase().includes(searchName.toLowerCase());
      const idMatch = item.iD_AAD?.toString().includes(searchId);
      
      if (searchName && searchId) {
        return nameMatch && idMatch;
      } else if (searchName) {
        return nameMatch;
      } else if (searchId) {
        return idMatch;
      }
      return true;
    });
    setFilteredData(filtered);
  }, [searchName, searchId, data]);

  const getColumns = () => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => key !== 'iD_GRUPO' && key !== 'errorNumber' && key !== 'errorMessage');
  };

  const handleCellClick = (rowIndex, column) => {
    setEditingCell({ rowIndex, column });
  };

  const handleCellChange = (rowIndex, column, value) => {
    const newData = [...data];
    newData[rowIndex][column] = value;
    setData(newData);
  };

  const handleAddRow = () => {
    navigate(`/components/sistemas/ins_sistemas/}`);
  };

  const handleDeleteRow = (rowIndex) => {
    const actualIndex = data.findIndex(item => item === filteredData[rowIndex]);
    const newData = data.filter((_, index) => index !== actualIndex);
    setData(newData);
  };

  const handleSave = () => {
    console.log('Datos actualizados:', data);
    toast.success('Cambios Guardados');
    navigate('/');
  };

  const handleEditRow = (row) => {
    navigate(`/components/sistemas/upd_sistemas/${row.iD_GRUPO}`, { state: { row } });
  };
  
  const renderCell = (row, rowIndex, column) => {
    const value = row[column];
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.column === column;

    if (isEditing) {
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

    return (
      <div
        onClick={() => handleCellClick(rowIndex, column)}
        className="cursor-pointer p-2 hover:bg-gray-50"
      >
        {value}
      </div>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Cargando datos...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-2" />
              Volver al Inicio
            </button>
            <h1 className="flex-grow text-center text-2xl font-bold text-gray-800">
              Tabla {title || `Tabla ${id}`}
            </h1>
          </div>

          {/* Barra de búsqueda */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por ID sistema..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
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
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((row, rowIndex) => (
                  <tr key={row.iD_GRUPO}>
                    {getColumns().map((column) => (
                      <td key={`${row.iD_GRUPO}-${column}`} className="px-6 py-4 whitespace-nowrap">
                        {renderCell(row, rowIndex, column)}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap space-x-4">
                      <button
                        onClick={() => handleEditRow(row)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={20} />
                      </button>
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

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleAddRow}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <Plus size={20} className="mr-2" />
              Añadir Fila
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Save size={20} className="mr-2" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
