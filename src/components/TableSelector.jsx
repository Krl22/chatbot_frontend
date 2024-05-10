import React, { useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import api from "../api"; // Importa el módulo de API

function TableSelector() {
  const { state } = useAuthContext();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await api.get(`/user-tables/${state.username}`);
        if (response.status === 200) {
          setTables(response.data);
        } else {
          console.error("Error al obtener las tablas:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener las tablas:", error);
      }
    };

    fetchTables();
  }, [state.username]);

  useEffect(() => {
    const storedSelectedTable = localStorage.getItem("selectedTable");
    const storedTableData = localStorage.getItem("tableData");
    if (storedSelectedTable && storedTableData) {
      setSelectedTable(storedSelectedTable);
      setTableData(JSON.parse(storedTableData));
    }
  }, []);

  const handleTableChange = async (event) => {
    const tableName = event.target.value;
    setSelectedTable(tableName);
    localStorage.setItem("selectedTable", tableName);

    try {
      const response = await api.get(
        `/show-table/${state.username}/${tableName}`
      );
      if (response.status === 200) {
        setTableData(response.data);
        localStorage.setItem("tableData", JSON.stringify(response.data));
      } else {
        console.error(
          "Error al obtener los datos de la tabla:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos de la tabla:", error);
    }
  };

  const handleTableDelete = async () => {
    try {
      await api.delete(`/delete-table/${state.username}/${selectedTable}`);
      const updatedTables = tables.filter((table) => table !== selectedTable);
      setTables(updatedTables);
      setSelectedTable("");
      setTableData([]);
    } catch (error) {
      console.error("Error al eliminar la tabla:", error);
    }
  };

  return (
    <div>
      <select
        value={selectedTable}
        onChange={handleTableChange}
        className="w-full max-w-xs m-4 text-lg select select-bordered"
      >
        <option value="">Seleccionar una tabla</option>
        {tables.map((tableName, index) => (
          <option key={index} value={tableName}>
            {tableName}
          </option>
        ))}
      </select>
      <div className="flex w-full">
        {selectedTable && (
          <>
            <h2 className="w-4/5 pl-8 my-6 text-2xl font-semibold text-center text-cyan-900">
              Data table: {selectedTable}
            </h2>
            <div className="flex items-center justify-center w-1/5">
              <a
                className="p-2 mt-2 font-semibold text-white rounded-lg cursor-pointer bg-rose-900"
                onClick={handleTableDelete}
              >
                delete
              </a>
            </div>
          </>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              {tableData.length > 0 &&
                Object.keys(tableData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableSelector;
