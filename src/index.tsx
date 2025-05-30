import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Desktop } from "./screens/Desktop";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeAnimationProvider } from "./components/ThemeAnimationProvider";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <ThemeAnimationProvider>
        <Desktop />
      </ThemeAnimationProvider>
    </ThemeProvider>
  </StrictMode>,
);