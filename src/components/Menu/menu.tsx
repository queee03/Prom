import React from "react";
// import classnames from "classnames";

type MenuMode = "horizontal" | "vertical";
export interface MenuProps {
  defaultIndex?: number;
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
  return <div>Menu</div>;
};

export default Menu;
