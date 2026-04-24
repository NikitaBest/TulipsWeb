import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import "@/app/styles/variables.css";
import "@/app/styles/globals.css";

const routerMode = (import.meta.env.VITE_ROUTER_MODE ?? "hash").toLowerCase();

if (routerMode === "hash") {
  const { origin, pathname, search, hash } = window.location;
  if (pathname !== "/") {
    const normalizedHash = hash && hash !== "#" ? hash : `#${pathname}${search}`;
    window.location.replace(`${origin}/${normalizedHash}`);
  }
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
