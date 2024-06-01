import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { lightBlue } from "@mui/material/colors";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const inputRef = useRef();
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const api = "http://localhost:8888/tasks";

  useEffect(() => {
    (async () => {
      const res = await fetch(`${api}/${id}`);

      if (!res.ok) {
        console.log(res.status);
        return;
      }

      const item = await res.json();
      setName(item.name);
    })();
  }, []);

  return (
    <Box
      maxWidth="md"
      sx={{
        margin: "auto",
        p: 4,
        maxWidth: "md",
        borderRadius: 10,
        mt: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: lightBlue[500],
      }}
    >
      <Box
        sx={{
          display: "flex",
          mb: 2,
          flexDirection: "row",
          alignItems: "center",
        }}
      ></Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          (async () => {
            await fetch(`${api}/${id}`, {
              method: "PUT",
              body: JSON.stringify({ name }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            navigate("/");
          })();
        }}
      >
        <OutlinedInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit">
                <SaveIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </form>
    </Box>
  );
}
