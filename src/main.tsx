
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { initPostHog } from "./lib/posthog";
  import "./styles/index.css";

  initPostHog();

  createRoot(document.getElementById("root")!).render(<App />);
  
