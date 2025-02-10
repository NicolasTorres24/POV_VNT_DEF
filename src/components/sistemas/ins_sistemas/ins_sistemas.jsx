import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, ArrowLeft } from "lucide-react";

export function SistemaForm({ onSubmit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_sistema: "",
    nombre: "",
    descripcion: "",
    url: "",
    icono: "",
    activo: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleCancel = () => {
    setFormData({
      id_sistema: "",
      nombre: "",
      descripcion: "",
      url: "",
      icono: "",
      activo: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-xl w-full">
        <div className="mb-6 flex items-center">
          {/* Botón de volver atrás */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-900 flex items-center mr-auto"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver atrás
          </button>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">
            Registro de Sistema
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[120px,1fr] gap-4 items-center">
            <label className="text-gray-700 font-medium">ID Sistema:</label>
            <input
              type="number"
              name="id_sistema"
              value={formData.id_sistema}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1.5 bg-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <label className="text-gray-700 font-medium">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1.5 bg-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <label className="text-gray-700 font-medium">Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={2}
              className="border border-gray-300 rounded px-3 py-1.5 bg-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <label className="text-gray-700 font-medium">URL:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1.5 bg-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <label className="text-gray-700 font-medium">Icono:</label>
            <input
              type="text"
              name="icono"
              value={formData.icono}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1.5 bg-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />

            <label className="text-gray-700 font-medium">Activo:</label>
            <div>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="h-5 w-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              <X size={20} className="mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-md transition-colors"
            >
              <Save size={20} className="mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
