import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { fetchDeals } from "./services/deals.services";

import Navbar from "./components/navbar";
import Main from "./components/main";
import Footer from "./components/footer";

import { CartProvider } from "./components/cartContext";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d400ff",
    },
    secondary: {
      main: "#ff0080",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "unset" } },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#ff0080",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff0080",
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: { display: "inherit" },
      },
    },
  },
});

function App() {
  const [deals, setDeals] = useState<any>([]);

  const loadDeals = async () => {
    try {
      const res = await fetchDeals();
      if (res) {
        setDeals(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CartProvider>
        <Navbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            backgroundColor: "black",
          }}
        >
          <Main deals={deals} />

          <Footer />
        </Box>
      </CartProvider>
    </MuiThemeProvider>
  );
}

export default App;
