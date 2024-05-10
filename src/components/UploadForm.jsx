import React, { useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import api from "../api"; // Importa el módulo de API

function UploadForm() {
  const { state } = useAuthContext();
  const [file, setFile] = useState(null);
  const [tableName, setTableName] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        `/upload-csv/?username=${state.username}`,
        formData
      );

      if (response.status === 200) {
        const data = await response.json();
        setMessage(data.mensaje);
        window.location.reload();
      } else {
        setMessage("Ocurrió un error al cargar el archivo.");
        console.error("Error al cargar el archivo:", response.statusText);
      }
    } catch (error) {
      setMessage("Ocurrió un error al cargar el archivo.");
      console.error("Error al cargar el archivo:", error);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Subir Archivo CSV</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block">Seleccione un archivo CSV:</label>
          <input
            className="w-full p-2 border border-gray-300"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label className="block">Nombre de la tabla:</label>
          <input
            className="w-full p-2 border border-gray-300"
            type="text"
            value={tableName}
            onChange={handleTableNameChange}
          />
        </div>
        <button
          className="px-4 py-2 text-white rounded bg-rose-900 hover:bg-blue-600"
          type="submit"
        >
          Subir Archivo
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}

export default UploadForm;
