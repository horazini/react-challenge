import { Fragment, useState } from "react";

import {
  Grid,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Badge,
  AppBar as MuiAppBar,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

import { useCartContext } from "./cartContext";

function Navbar(): JSX.Element {
  return (
    <Fragment>
      <Box>
        <CssBaseline />
        <MuiAppBar position="fixed">
          <Toolbar
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              padding={2}
            >
              <Box>
                <Link
                  sx={{
                    fontWeight: "bold",
                    fontSize: 32,
                    color: "#d400ff",
                    textDecoration: "none",
                  }}
                  href="/"
                >
                  MS
                </Link>
              </Box>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-around"
              >
                <Link
                  style={{
                    marginRight: 100,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  href="/"
                >
                  Home
                </Link>
                <Link
                  style={{
                    marginRight: 100,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  href="/"
                >
                  Browse
                </Link>
                <CartMenu />
              </Box>
            </Grid>
          </Toolbar>
        </MuiAppBar>
      </Box>
    </Fragment>
  );
}

const CartMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const cartOpen = Boolean(anchorEl);
  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const { selectedGames } = useCartContext();

  const cartTotalPrice: number = selectedGames.reduce(
    (total, game) => Number((total + game.salePrice).toFixed(2)),
    0
  );

  const numberOfGames: number = selectedGames.length;

  return (
    <Fragment>
      <Badge badgeContent={numberOfGames} color="primary">
        <Button
          style={{ border: "2px solid" }}
          variant="outlined"
          color="secondary"
          sx={{ textTransform: "none" }}
          onClick={handleCartClick}
          size="large"
        >
          <ShoppingCartIcon sx={{ mr: 1 }} />
          Cart
        </Button>
      </Badge>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={cartOpen}
        onClose={handleCartClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleCartClose}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={`Total: $${cartTotalPrice} `}
            secondary={
              numberOfGames === 0
                ? "Your cart is empty"
                : numberOfGames === 1
                ? "of 1 selected game"
                : `of ${numberOfGames} selected games`
            }
          />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Navbar;
