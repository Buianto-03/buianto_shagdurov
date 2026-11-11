import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/global.scss";
import { App } from "./app/App";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { version } from "../package.json";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div id={version}>
      <RouterProvider
        router={createBrowserRouter([
          { index: true, element: <App /> },
          {
            path: "*",
            element: <Navigate to={"/"} />,
          },
        ])}
      />
    </div>
  </StrictMode>,
);
