import React, { useState } from "react";
import { Save, X } from "lucide-react";

export function SistemaForm({ onSubmit }) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-black/5 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl flex items-center  justify-center font-bold text-black mb-6">Registro de Sistema</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[200px,1fr] gap-4 items-center">
            <label className="text-black font-medium">ID Sistema:</label>
            <input
              type="number"
              name="id_sistema"
              value={formData.id_sistema}
              onChange={handleChange}
              className="border border-black/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border border-black/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium">Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="border border-black/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium">URL:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="border border-black/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium">Icono:</label>
            <input
              type="text"
              name="icono"
              value={formData.icono}
              onChange={handleChange}
              className="border border-black/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent"
            />

            <label className="text-black font-medium">Activo:</label>
            <div>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="h-5 w-5 text-black bg-black border-black rounded focus:ring-black"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-black/10 hover:bg-black/20 text-black rounded-md transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-black hover:bg-black/80 text-white rounded-md transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
