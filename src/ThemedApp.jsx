import { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Edit from "./Edit";
import Template from "./Template";

export const AppContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
    ],
  },
]);

export default function ThemedApp() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ mode, setMode }}>
        {/* <App /> */}
        <RouterProvider router={router} />
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
