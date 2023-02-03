import { createContext } from "react";

export interface MenuContextProps {
  index: number;
  onSelect?: (selectedIndex: number) => void;
}

const MenuContext = createContext<MenuContextProps>({
  index: 0,
});

export default MenuContext;
