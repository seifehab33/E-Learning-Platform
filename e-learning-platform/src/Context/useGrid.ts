import { useContext } from "react";
import { GridContext } from "./GridContext";

export const useGrid = () => useContext(GridContext);
