import { FC } from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu, { SubMenuProps } from "./subMenu";

export type MenuComponentType = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const MenuComponent = Menu as MenuComponentType;
MenuComponent.Item = MenuItem;
MenuComponent.SubMenu = SubMenu;

export default MenuComponent;
