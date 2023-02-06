import { createContext } from 'react';

export type MenuIndex = number | string;
export type MenuMode = 'horizontal' | 'vertical';

export interface MenuContextProps {
  currentIndex?: MenuIndex;
  mode?: MenuMode;
  defaultOpenSubMenus?: MenuIndex[];
  onSelect?: (selectedIndex: MenuIndex) => void;
}

const MenuContext = createContext<MenuContextProps>({});

export default MenuContext;
