import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PM_PREFIX_CLS } from '@/configs/constant';

import { ButtonProps } from './button';
import Button from './index';

const testProps: ButtonProps = {
  onClick: jest.fn(), // 模拟函数
};

describe('test Button component', () => {
  test('should render the correct default Button', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const ele = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('BUTTON');
    expect(ele).toHaveClass(`${PM_PREFIX_CLS}-button ${PM_PREFIX_CLS}-button-default`);
    expect(ele.disabled).toBeFalsy();
    userEvent.click(ele);
    expect(testProps.onClick).toHaveBeenCalled();
  });

  test('should render the correct component based on different props', () => {
    const wrapper = render(
      <Button type="primary" size="large" className="klass">
        Nice
      </Button>,
    );
    const ele = wrapper.getByText('Nice');
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass(
      `${PM_PREFIX_CLS}-button ${PM_PREFIX_CLS}-button-primary ${PM_PREFIX_CLS}-button-lg klass`,
    );
  });

  test('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button type="link" href="http://yes">
        Nice
      </Button>,
    );
    const ele = wrapper.getByText('Nice');
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('A');
    expect(ele).toHaveClass(`${PM_PREFIX_CLS}-button ${PM_PREFIX_CLS}-button-link`);
  });

  test('should render disabled button when disabled set to true', () => {
    const wrapper = render(
      <Button {...testProps} disabled={true}>
        Nice
      </Button>,
    );
    const ele = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass(`${PM_PREFIX_CLS}-button`);
    expect(ele).not.toHaveClass('disabled');
    expect(ele.disabled).toBeTruthy();
    userEvent.click(ele);
    expect(testProps.onClick).not.toHaveBeenCalled();
  });
});
