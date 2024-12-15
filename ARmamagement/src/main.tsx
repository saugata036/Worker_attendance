// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA6Jizr79kFImAM_KA0Y0levlrqr6JslvQ",
//   authDomain: "hrms-45847.firebaseapp.com",
//   projectId: "hrms-45847",
//   storageBucket: "hrms-45847.firebasestorage.app",
//   messagingSenderId: "647373437972",
//   appId: "1:647373437972:web:0960aa4be8806e2e0a3b01"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </StrictMode>
);
