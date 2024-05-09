import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";

const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173" // URL de tu frontend local en desarrollo
    : "https://05d7ec40-014c-4421-b80a-a5a6e38b89bd.e1-us-cdp-2.choreoapps.dev"; // URL de tu frontend de Choreo en producción

const config = {
  signInRedirectURL: SERVER_URL,
  signOutRedirectURL: SERVER_URL,
  clientID: "G0t4CC2gkHwv8RwRSGZpfFrj5Lwa",
  baseUrl: "https://api.asgardeo.io/t/ccab",
  scope: ["openid", "profile"],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <div className="overflow-y-hidden">
        <App />
      </div>
    </AuthProvider>
  </React.StrictMode>
);
