"use client";
import { createContext } from "react";

export const FavoriteContext = createContext({
  favoriteChanged: false,
  setFavoriteChanged: () => {},
});
