import React, { useState } from "react";
import { Save, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SistemaForm_upd({ onSubmit }) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <div className="mb-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-black/70 hover:text-black flex items-center mr-auto"
          >
            <ArrowLeft size={18} className="mr-2" />
            Volver atrás
          </button>
          <h1 className="text-lg font-bold text-black text-center flex-grow pr-16">
            Registro de Sistema
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-[100px,1fr] gap-3 items-center">
            <label className="text-black font-medium text-sm">ID Sistema:</label>
            <input
              type="number"
              name="id_sistema"
              value={formData.id_sistema || 1}
              readOnly
              className="border border-black/20 rounded px-3 py-1.5 bg-gray-200 focus:outline-none cursor-not-allowed"
            />

            <label className="text-black font-medium text-sm">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border border-black/20 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium text-sm">Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={2}
              className="border border-black/20 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium text-sm">URL:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="border border-black/20 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium text-sm">Icono:</label>
            <input
              type="text"
              name="icono"
              value={formData.icono}
              onChange={handleChange}
              className="border border-black/20 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium text-sm">Activo:</label>
            <div>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="h-4 w-4 text-black bg-black border-black rounded focus:ring-black"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-3 py-1.5 bg-black/10 hover:bg-black/20 text-black rounded transition-colors"
            >
              <X className="w-4 h-4 mr-1.5" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-3 py-1.5 bg-black hover:bg-black/80 text-white rounded transition-colors"
            >
              <Save className="w-4 h-4 mr-1.5" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}