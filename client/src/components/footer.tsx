import { Fragment } from "react";

import { Grid, Box, Link, Typography } from "@mui/material";

const links = [
  "Acerca de Valve",
  "Steamworks",
  "Empleo",
  "Distribución de Steam",
  "Tarjetas regalo",
  "Steam",
  "@steam",
];

function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#1a1a1a",
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
        <Typography variant="body1">
          {links.map((text, index) => (
            <Fragment key={text}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                href="/"
              >
                {text}
              </Link>
              {index < links.length - 1 ? " | " : null}
            </Fragment>
          ))}
        </Typography>
      </Grid>
    </Box>
  );
}

export default Footer;
