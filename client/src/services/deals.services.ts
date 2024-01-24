import axios from "axios";

export const fetchDeals = async () => {
  return await axios.get(
    `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15`
  );
};
