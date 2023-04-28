import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PM_PREFIX_CLS } from '@/configs/constant';

import Menu from './index';
import { MenuProps } from './menu';

const testProps: MenuProps = {
  defaultIndex: '0',
  className: 'test',
  onSelect: jest.fn(),
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>active</Menu.Item>
      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.Item>prom</Menu.Item>
      <Menu.SubMenu title="sub">
        <Menu.Item>sub 1</Menu.Item>
        <Menu.Item>sub 2</Menu.Item>
      </Menu.SubMenu>
      {/* <li>error</li> */}
    </Menu>
  );
};

// test 不会读取 css 样式，需要手动模拟
const createStyleFile = () => {
  // 由于 SubMenu 已经修改了其展示/隐藏的方式，所以这个 CSS 其实已经不需要了，还留着是为了示范
  const cssFile = `
    .#{$pm-prefix}-submenu {
      display: none;
    }

    .#{$pm-prefix}-submenu.is-opened {
      display: block；
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  // https://www.jestjs.cn/docs/api#beforeeachfn-timeout
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId(`${PM_PREFIX_CLS}-menu`);
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  test('should render the correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass(`${PM_PREFIX_CLS}-menu test`);
    // expect(menuElement.getElementsByTagName('li').length).toEqual(4); // 6
    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass(`${PM_PREFIX_CLS}-menu-item is-active`);
    expect(disabledElement).toHaveClass(`${PM_PREFIX_CLS}-menu-item is-disabled`);
  });

  test('click items should change active and call the right callback', () => {
    const commonElement = wrapper.getByText('prom');
    expect(commonElement).not.toHaveClass('is-active');
    userEvent.click(commonElement);
    expect(commonElement).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');

    userEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  test('should render vertical mode when mode is set to vertical', () => {
    // https://testing-library.com/docs/svelte-testing-library/api/#cleanup
    cleanup(); // 否则: Found multiple elements by: [data-testid="pm-menu"]
    const verticalWrapper = render(generateMenu({ ...testProps, mode: 'vertical' }));
    const verticalMenuElement = verticalWrapper.getByTestId(`${PM_PREFIX_CLS}-menu`);
    expect(verticalMenuElement).toHaveClass(`${PM_PREFIX_CLS}-menu-vertical`);
  });

  test('should show dropdown items when hover on subMenu', async () => {
    const querySubElement = () => wrapper.queryByText('sub 1');
    expect(querySubElement()).not.toBeInTheDocument();

    const dropdownElement = wrapper.getByText('sub');
    userEvent.hover(dropdownElement);
    // waitFor: 默认等待 1000ms
    await waitFor(() => {
      expect(querySubElement()).toBeInTheDocument();
      expect(querySubElement()).toBeVisible();
    });
    userEvent.click(wrapper.getByText('sub 1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    userEvent.unhover(dropdownElement);
    await waitFor(() => {
      expect(querySubElement()).not.toBeInTheDocument();
    });
  });
});
