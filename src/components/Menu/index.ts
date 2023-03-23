import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

export type MenuComponentType = typeof Menu & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
};

const MenuComponent = Menu as MenuComponentType;
MenuComponent.Item = MenuItem;
MenuComponent.SubMenu = SubMenu;

export default MenuComponent;
