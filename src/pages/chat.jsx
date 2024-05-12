import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import api from "../api";

const Chat = () => {
  const { state } = useAuthContext();
  const [messages, setMessages] = useState([
    {
      content:
        "Hi I'm you bot assistant and I'm able to read all your tables and notes to get a better answer!.",
      className: "chat chat-start",
    },
    {
      content:
        "You can uncheck your notes if you don't want me to consider them in my responses.",
      className: "chat chat-start",
    },
    {
      content:
        "Press the restart button if you want to start the conversation over",
      className: "chat chat-start",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  const fetchResponse = async (query) => {
    try {
      // Realizar la solicitud al endpoint correspondiente
      const response = await api.get(`/chat/${state.username}/${query}`);

      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        return response.data;
      } else {
        // Manejar errores de la solicitud
        console.error("Error al realizar la solicitud:", response.status);
        throw new Error("Error al realizar la solicitud");
      }
    } catch (error) {
      // Manejar errores en la solicitud
      console.error("Error al procesar la solicitud:", error);
      throw error;
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      const query = inputValue;
      const newMessage = {
        content: query,
        className: "chat chat-end",
      };

      // Update messages state using functional form of setMessages
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");

      try {
        const responseData = await fetchResponse(query);

        // Crear un nuevo mensaje con la respuesta recibida
        const botResponse = {
          content: responseData,
          className: "chat chat-start",
        };

        // Update messages state again
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error al obtener la respuesta:", error);
        // Display an error message to the user
        const errorMessage = {
          content: "Oops! Something went wrong. Please try again later.",
          className: "chat chat-start",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  const handleRestartChat = async () => {
    try {
      await api.post(`/restart/${state.username}`);

      // Actualizar el estado de los mensajes para reiniciar el chat
      setMessages([
        {
          content: "Chat restarted successfully.",
          className: "chat chat-start",
        },
      ]);
    } catch (error) {
      console.error("Error al reiniciar el chat:", error);
      // Display an error message to the user
      const errorMessage = {
        content: "Oops! Something went wrong. Please try again later.",
        className: "chat chat-start",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    // Desplazar hacia abajo el contenedor del chat cuando se agregue un nuevo mensaje
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-cyan-900 rounded-3xl">
      <div className="relative w-5/6 mb-20 bg-blue-300 shadow-2xl rounded-3xl h-3/4">
        <div className="sticky top-0 z-10 flex justify-between p-4 px-8 bg-blue-600 shadow-md rounded-t-3xl">
          <div className="py-4 text-center">
            <h2 className="text-3xl font-semibold text-white ">Analyst Bot</h2>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="p-2 text-2xl text-white border rounded-md cursor-pointer"
              onClick={handleRestartChat}
            >
              restart chat
            </a>
          </div>
        </div>
        <div className="flex flex-col w-full mb-20 shadow-lg h-[90%] rounded-2xl bg-ccab-white">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={message.className}>
                <div className="chat-bubble max-w-[600px]">
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-none">
            <input
              type="text"
              placeholder="Type here"
              className="w-full input input-bordered"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
