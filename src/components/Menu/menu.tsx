import React, { createContext, useState } from "react";
import classnames from "classnames";

type MenuMode = "horizontal" | "vertical";
type OnSelectCallback = (selectedIndex: number) => void;

interface IMenuContext {
  index: number;
  onSelect?: OnSelectCallback;
}

const DEFAULT_INDEX = 0;

export interface MenuProps {
  defaultIndex?: number;
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: OnSelectCallback;
}

export const MenuContext = createContext<IMenuContext>({
  index: DEFAULT_INDEX,
});

const Menu: React.FC<MenuProps> = ({
  defaultIndex,
  mode,
  className,
  children,
  onSelect,
  ...props
}) => {
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const classes = classnames("pm-menu", className, {
    "pm-menu-vertical": mode === "vertical",
  });

  const handleClick = (index: number) => {
    setCurrentActive(index);
    onSelect?.(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive || DEFAULT_INDEX,
    onSelect: handleClick,
  };

  return (
    <ul data-testid="test-pm-menu" className={classes} {...props}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: DEFAULT_INDEX,
  mode: "horizontal",
};

export default Menu;
