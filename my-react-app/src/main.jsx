import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ShoppingProvider } from "./contexts/ShoppingContext.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ShoppingProvider>
        <SmoothScroll>
          <CustomCursor />
          <App />
        </SmoothScroll>
      </ShoppingProvider>
    </BrowserRouter>
  </StrictMode>,
);
