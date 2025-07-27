import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Elements from "./Elements.jsx";
import { ToastContainer } from "react-toastify";
import AuthState from "./contextapi/authcontext/Authstate.jsx";
import ListState from "./contextapi/listcontext/ListState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthState>
      <ListState>
        <Elements />
      </ListState>
    </AuthState>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />
  </StrictMode>
);
