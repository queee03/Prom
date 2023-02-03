import React, { useContext } from "react";
import classnames from "classnames";
import MenuContext from "./menuContext";

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = ({
  className,
  index,
  disabled,
  children,
  ...props
}) => {
  const context = useContext(MenuContext);

  const classes = classnames("pm-menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && index) {
      if (!disabled) context.onSelect(index);
    }
  };

  return (
    <li className={classes} {...props} onClick={handleClick}>
      {children}
    </li>
  );
};

// React 内置的静态属性
MenuItem.displayName = "MenuItem";
export default MenuItem;
