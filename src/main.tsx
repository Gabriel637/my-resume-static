import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/home";
import LovePage from "./Pages/love";
import { AppProviders } from "./providers/AppProviders";

const App = () => (
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter basename="/my-resume-static">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/love" element={<LovePage />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

