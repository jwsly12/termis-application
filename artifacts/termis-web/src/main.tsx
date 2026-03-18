import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(<App />);
<>
    <App />
    <Toaster /> {/* Isso permite que o toast() funcione em qualquer lugar */}
  </>