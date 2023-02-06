import React, { cloneElement, FunctionComponentElement, useContext, useState } from 'react';

import classnames from 'classnames';

import MenuContext, { MenuIndex } from './menuContext';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: MenuIndex;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext);
  const isDefaultOpen =
    context.mode === 'vertical' && (index || index === 0)
      ? context.defaultOpenSubMenus?.includes(index)
      : false;
  const [isOpened, setIsOpened] = useState(isDefaultOpen);
  let timer: NodeJS.Timeout | undefined;

  const classes = classnames('pm-menu-item pm-menu-submenu-item', className, {
    'is-active': context.currentIndex === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpened(!isOpened);
  };

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    // 增加 300 的延迟是为了鼠标移入 subMenu 的过程中保持菜单展开
    timer = setTimeout(() => {
      setIsOpened(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classnames('pm-submenu', {
      'is-opened': isOpened,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return cloneElement(childElement, { index: `${index || 0}-${i}` });
      }
      console.error('Warning: Menu has a child which is not a MenuItem component');
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li className={classes} key={index} {...hoverEvents}>
      <div className="title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
