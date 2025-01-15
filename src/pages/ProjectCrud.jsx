import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const initialData = [
  { id: 1, task: 'Design mockups', assignee: 'John Doe', status: 'In Progress' },
  { id: 2, task: 'Frontend development', assignee: 'Jane Smith', status: 'Pending' },
  { id: 3, task: 'Backend integration', assignee: 'Mike Johnson', status: 'Completed' }
];

const initialRow = {
  id: '',
  task: '',
  assignee: '',
  status: 'Pending'
};

export function ProjectCrud() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState('');
  const [tableData, setTableData] = useState(initialData);
  const [editingCell, setEditingCell] = useState(null);

  useEffect(() => {
    // In a real app, fetch project details and table data
    setProjectTitle(`Project #${id}`);
  }, [id]);

  const handleCellClick = (rowIndex, column) => {
    setEditingCell({ rowIndex, column });
  };

  const handleCellChange = (rowIndex, column, value) => {
    const newData = [...tableData];
    newData[rowIndex][column] = value;
    setTableData(newData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { ...initialRow, id: Date.now() }]);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  const handleSave = () => {
    // In a real app, save changes to backend
    toast.success('Changes saved successfully!');
    navigate('/');
  };

  const renderCell = (value, rowIndex, column) => {
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.column === column;

    if (isEditing) {
      if (column === 'status') {
        return (
          <select
            value={value}
            onChange={(e) => handleCellChange(rowIndex, column, e.target.value)}
            onBlur={() => setEditingCell(null)}
            autoFocus
            className="w-full p-1 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        );
      } else {
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleCellChange(rowIndex, column, e.target.value)}
            onBlur={() => setEditingCell(null)}
            autoFocus
            className="w-full p-1 border rounded"
          />
        );
      }
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{projectTitle}</h1>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Save size={20} className="mr-2" />
              Save Changes
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row, rowIndex) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderCell(row.task, rowIndex, 'task')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderCell(row.assignee, rowIndex, 'assignee')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderCell(row.status, rowIndex, 'status')}
                    </td>
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

          <div className="mt-4">
            <button
              onClick={handleAddRow}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <Plus size={20} className="mr-2" />
              Add Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}