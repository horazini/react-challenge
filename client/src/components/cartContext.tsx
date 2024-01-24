import React, { createContext, useContext, useState } from "react";

type SelectedGames = {
  gameID: string;
  salePrice: number;
}[];

const CartContext = createContext<{
  selectedGames: SelectedGames;
  handleGameSelect: (gameID: string, salePrice: number) => void;
}>({
  selectedGames: [],
  handleGameSelect: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGames, setSelectedGames] = useState<SelectedGames>([]);

  const handleGameSelect = (gameID: string, salePrice: number) => {
    if (selectedGames.some((game) => game.gameID === gameID)) {
      setSelectedGames((prev) => prev.filter((game) => game.gameID !== gameID));
    } else {
      setSelectedGames((prev) => [
        ...prev,
        { gameID: gameID, salePrice: salePrice },
      ]);
    }
  };

  return (
    <CartContext.Provider value={{ selectedGames, handleGameSelect }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
