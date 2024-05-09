import React, { useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import api from "../api";

const Notes = () => {
  const { state } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    username: state.username,
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get(
        `/notes/?user_id=${encodeURIComponent(state.username)}`
      ); // Usa el módulo de API para hacer la solicitud
      if (response.status === 200) {
        setNotes(response.data);
      } else {
        console.error("Error al obtener las notas:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener las notas:", error.message);
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/notes/", newNote); // Usa el módulo de API para hacer la solicitud
      if (response.status === 200) {
        setNewNote({ title: "", description: "" });
        fetchNotes();
        // window.location.reload();
      } else {
        console.error("Error al crear la nota:", response.statusText);
      }
    } catch (error) {
      console.error("Error al crear la nota:", error.message);
    }
  };

  const handleCheckboxChange = async (noteId, currentStatus) => {
    try {
      const response = await api.put(
        `/notes/${noteId}/status/?user_id=${encodeURIComponent(
          state.username
        )}&new_status=${!currentStatus}`
      );
      if (response.status === 200) {
        fetchNotes(); // Actualizar notas después de la actualización exitosa
      } else {
        console.error(
          "Error al actualizar el estado de la nota:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la nota:", error.message);
    }
  };

  const handleNoteDelete = async (noteId) => {
    try {
      const response = await api.delete(
        `/notes/${noteId}/?user_id=${encodeURIComponent(state.username)}`
      );
      if (response.status === 200) {
        fetchNotes();
      } else {
        console.error("Error al eliminar la nota:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar la nota:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-cyan-900">
      <div className="relative w-5/6 mb-20 overflow-y-auto bg-white shadow-2xl rounded-3xl h-3/4">
        <div className="sticky top-0 z-10 flex justify-between p-4 px-8 shadow-md bg-rose-900">
          <div className="flex justify-between w-full px-4 py-4">
            <h2 className="text-3xl font-semibold text-white ">Notes</h2>
            <button
              className="flex items-center h-full p-2 text-2xl text-white transition duration-300 border rounded-md cursor-pointer bg-rose-900 hover:brightness-125"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              New Note
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <form onSubmit={handleNoteSubmit} className="mb-4">
                  <div className="mb-4">
                    <label className="block mb-2">Título:</label>
                    <input
                      type="text"
                      value={newNote.title}
                      onChange={(e) =>
                        setNewNote({ ...newNote, title: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Descripción:</label>
                    <textarea
                      value={newNote.description}
                      onChange={(e) =>
                        setNewNote({ ...newNote, description: e.target.value })
                      }
                      className="w-full h-24 p-2 border border-gray-300 resize-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Crear Nota
                  </button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <div className="flex flex-wrap m-6">
          {notes.map((note) => (
            <div key={note.id} className="w-1/6 m-4 rounded-lg shadow-lg">
              <input
                type="checkbox"
                checked={note.status}
                className="checkbox"
                onChange={() => handleCheckboxChange(note.id, note.status)}
              />
              <h1 className="mb-4 text-2xl text-center truncate text-cyan-900">
                {note.title}
              </h1>
              <div className="h-32 p-2 m-4 overflow-y-auto rounded-lg bg-amber-200 ">
                <p className="whitespace-normal">{note.description}</p>
              </div>
              <div className="flex justify-center p-2">
                <button
                  onClick={() => handleNoteDelete(note.id)}
                  className="p-2 mt-2 font-semibold text-white rounded-lg bg-rose-900"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
