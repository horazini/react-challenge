import { useEffect, useState } from "react";

import {
  Grid,
  Box,
  TextField,
  Card,
  Button,
  CardContent,
  CardMedia,
  Typography,
  Container,
  InputAdornment,
  Badge,
} from "@mui/material";

import {
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";

import { useCartContext } from "./cartContext";

type Deal = {
  gameID: string;
  title: string;
  salePrice: string;
  normalPrice?: string;
  savings: string;
  steamRatingPercent: string;
  thumb: string;
};

interface MainProps {
  deals: Deal[];
}

function Main({ deals }: MainProps): JSX.Element {
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(deals || []);

  useEffect(() => {
    setFilteredDeals(deals);
  }, [deals]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(e.target.value);
  };

  useEffect(() => {
    // debounce function
    const timer = setTimeout(async () => {
      const filtered = deals.filter((deal) =>
        deal.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
      setFilteredDeals(filtered);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [deals, titleFilter]);

  //#region Card hover

  const [hoveredDealId, setHoveredDealId] = useState<string | null>(null);

  const handleMouseEnter = (dealId: string) => {
    setHoveredDealId(dealId);
  };

  const handleMouseLeave = () => {
    setHoveredDealId(null);
  };

  //#endregion

  const { selectedGames, handleGameSelect } = useCartContext();

  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          image={process.env.PUBLIC_URL + "/image.png"}
          title="Devlights Frontend Challenge"
        />
      </Card>
      <Container sx={{ paddingBottom: 6 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={5}>
            <TextField
              id="search"
              label="Search"
              value={titleFilter}
              onChange={handleInputChange}
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ pointerEvents: "none" }}
                    sx={{ color: "#ff0080" }}
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <Grid
                  item
                  xs={3}
                  sm={3}
                  key={deal.gameID}
                  onMouseEnter={() => handleMouseEnter(deal.gameID)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Badge
                    badgeContent={`${Number(deal.savings).toFixed()}%off`}
                    color="error"
                    overlap="circular"
                    sx={{ paddingTop: 2 }}
                  >
                    <Card
                      sx={{
                        m: 2,
                        border: selectedGames.some(
                          (game) => game.gameID === deal.gameID
                        )
                          ? "2px solid #aa00ff"
                          : null,
                        borderRadius: "8px",
                      }}
                      style={{
                        backgroundColor:
                          hoveredDealId === deal.gameID ? "#1a1a1a" : "#000000",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={deal.thumb}
                        title={deal.title}
                        style={{
                          padding: 10,
                        }}
                      />
                      <CardContent
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            minHeight: 50, // min height so Cards do not misalign due to different title lengths
                          }}
                        >
                          {deal.title}
                        </Typography>
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Steam review
                          </Typography>
                          <Box>
                            {
                              // renders the 100 points rating as a 5 stars rating
                              Array.from({ length: 5 }, (_, index) =>
                                index <
                                Math.round(
                                  Number(deal.steamRatingPercent) / 20
                                ) ? (
                                  <StarIcon
                                    key={index}
                                    sx={{ color: "#ffaa00" }}
                                  />
                                ) : (
                                  <StarBorderIcon
                                    key={index}
                                    sx={{ color: "#ffaa00" }}
                                  />
                                )
                              )
                            }
                          </Box>

                          <Button
                            variant="contained"
                            onClick={() =>
                              handleGameSelect(
                                deal.gameID,
                                Number(deal.salePrice)
                              )
                            }
                          >
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              {deal.normalPrice ? (
                                <Typography
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: 10,
                                  }}
                                >
                                  ${deal.normalPrice}
                                </Typography>
                              ) : null}
                              <Typography>${deal.salePrice}</Typography>
                            </Box>
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Badge>
                </Grid>
              ))
            ) : titleFilter !== "" ? (
              <Typography>No games were found</Typography>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Main;
