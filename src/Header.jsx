import { useContext } from "react";

import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";

import {
  List as ListIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

import { AppContext } from "./ThemedApp";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header({ count }) {
  const { mode, setMode } = useContext(AppContext);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        {pathname === "/" ? (
          <IconButton>
            <ListIcon style={{ color: "#FFF" }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon style={{ color: "#FFF" }} />
          </IconButton>
        )}

        <Typography sx={{ ml: 2, flexGrow: 1 }}>
          {pathname === "/" ? "Todo" : " Edit Page"}
        </Typography>

        {mode === "dark" ? (
          <IconButton onClick={() => setMode("light")}>
            <LightModeIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setMode("dark")}>
            <DarkModeIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
