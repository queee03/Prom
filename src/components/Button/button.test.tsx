import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn(), // 模拟函数
};

describe("test Button component", () => {
  test("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const ele = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual("BUTTON");
    expect(ele).toHaveClass("pm-button pm-button-default");
    expect(ele.disabled).toBeFalsy();
    userEvent.click(ele);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test("should render the correct component based on different props", () => {
    const wrapper = render(
      <Button type="primary" size="large" className="klass">
        Nice
      </Button>
    );
    const ele = wrapper.getByText("Nice");
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("pm-button pm-button-primary pm-button-lg klass");
  });

  test("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(
      <Button type="link" href="http://yes">
        Nice
      </Button>
    );
    const ele = wrapper.getByText("Nice");
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual("A");
    expect(ele).toHaveClass("pm-button pm-button-link");
  });

  test("should render disabled button when disabled set to true", () => {
    const wrapper = render(
      <Button {...defaultProps} disabled={true}>
        Nice
      </Button>
    );
    const ele = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("pm-button");
    expect(ele).not.toHaveClass("disabled");
    expect(ele.disabled).toBeTruthy();
    userEvent.click(ele);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});
