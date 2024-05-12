import { useState, useEffect } from "react";
import Chat from "./chat";
import Notes from "./Notes";
import Tables from "./Tables";

function Home() {
  // Estado para almacenar el índice del botón seleccionado
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("selectedTab") || "MyTables"
  );

  // Guardar el estado selectedTab en el localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex w-screen">
      <div className="w-[200px] bg-neutral-400">
        <ul className="w-[200px] menu bg-base-200 ">
          <li>
            <div
              onClick={() => setSelectedTab("MyTables")}
              className={`tooltip tooltip-right ${
                selectedTab === "MyTables" ? "bg-slate-700 text-white" : ""
              }`}
              data-tip="here you can upload tables"
            >
              <a>My Tables</a>
            </div>
          </li>
          <li>
            <div
              onClick={() => setSelectedTab("Notes")}
              className={`tooltip tooltip-right ${
                selectedTab === "Notes" ? "bg-slate-700 text-white" : ""
              }`}
              data-tip="add notes!"
            >
              <a>Notes</a>
            </div>
          </li>
          <li>
            <div
              onClick={() => setSelectedTab("Chat")}
              className={`tooltip tooltip-right ${
                selectedTab === "Chat" ? " text-white bg-slate-700" : ""
              }`}
              data-tip="chat with the AI!"
            >
              <a>Chat</a>
            </div>
          </li>
        </ul>
      </div>
      <div className="w-full h-screen bg-cyan-900">
        {selectedTab === "MyTables" && <Tables></Tables>}
        {selectedTab === "Notes" && <Notes></Notes>}
        {selectedTab === "Chat" && (
          <div className="flex items-center justify-center h-full ">
            <Chat></Chat>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
