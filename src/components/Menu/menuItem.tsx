import React, { useContext } from "react";
import classnames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled,
  className,
  children,
  ...props
}) => {
  const context = useContext(MenuContext);

  const classes = classnames("pm-menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} {...props} onClick={handleClick}>
      MenuItem
    </li>
  );
};

export default MenuItem;
