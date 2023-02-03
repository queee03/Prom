import { render, RenderResult, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Menu from "./index";
import { MenuProps } from "./menu";

const testProps: MenuProps = {
  defaultIndex: 0,
  className: "test",
  onSelect: jest.fn(),
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>active</Menu.Item>
      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.Item>prom</Menu.Item>
      {/* <li>error</li> */}
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId("test-pm-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });

  test("should render the correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("pm-menu test");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("pm-menu-item is-active");
    expect(disabledElement).toHaveClass("pm-menu-item is-disabled");
  });

  test("click items should change active and call the right callback", () => {
    const commonElement = wrapper.getByText("prom");
    expect(commonElement).not.toHaveClass("is-active");
    userEvent.click(commonElement);
    expect(commonElement).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);

    userEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  test("should render vertical mode when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-pm-menu");
    expect(menuElement).toHaveClass("pm-menu-vertical");
  });
});
