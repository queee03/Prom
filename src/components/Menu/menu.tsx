import React, { cloneElement, FunctionComponentElement, useState } from "react";
import classnames from "classnames";
import MenuContext, { MenuContextProps } from "./menuContext";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";

export interface MenuProps {
  defaultIndex?: number;
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
}

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

  const passedContext: MenuContextProps = {
    index: currentActive || 0,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    // React.Children 提供了用于处理 props.children 不透明数据结构的实用方法
    // https://zh-hans.reactjs.org/docs/react-api.html#reactchildren
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName !== "MenuItem") {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
      return cloneElement(childElement, { index });
    });
  };

  return (
    <ul data-testid="test-pm-menu" className={classes} {...props}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
