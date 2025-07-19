import "../shared.scss";

import { createRoot } from "react-dom/client";
import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Missing rootElement");
  const root = createRoot(rootElement);
  root.render(<App />);
});
