import React, { cloneElement, FunctionComponentElement, useContext, useState } from 'react';

import classnames from 'classnames';

import Icon from '@/components/Icon';
import Transition from '@/components/Transition';
import { PM_PREFIX_CLS } from '@/configs/constant';

import MenuContext, { MenuIndex } from './menuContext';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps extends React.HTMLAttributes<HTMLLIElement> {
  index?: MenuIndex;
  title: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children, ...restProps }) => {
  const context = useContext(MenuContext);
  const isDefaultOpen =
    context.mode === 'vertical' && index ? context.defaultOpenSubMenus?.includes(index) : false;
  const [isOpened, setIsOpened] = useState(isDefaultOpen);
  const isActive =
    context.currentIndex === index ||
    (typeof context.currentIndex === 'string'
      ? context.currentIndex.split('-')[0] === index
      : false);
  let timer: NodeJS.Timeout | undefined;

  const classes = classnames(`${PM_PREFIX_CLS}-menu-item pm-menu-submenu-item`, className, {
    'is-active': isActive,
    'is-opened': isOpened,
    'is-vertical': context.mode === 'vertical',
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
    const subMenuClasses = classnames(`${PM_PREFIX_CLS}-submenu`, {
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

    if (context.mode === 'vertical') return <ul className={subMenuClasses}>{childrenComponent}</ul>;

    return (
      <Transition animation="zoom-in-top" in={isOpened} timeout={300}>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li className={classes} key={index} {...restProps} {...hoverEvents}>
      <div className="title" {...clickEvents}>
        {title}
        <Icon className="arrow-icon" icon="chevron-down" size="xs" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
