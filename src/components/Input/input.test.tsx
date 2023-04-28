import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PM_PREFIX_CLS } from '@/configs/constant';

import Input from './index';
import { InputProps } from './input';

const testProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};

describe('test Input component', () => {
  test('should render the correct default Input', () => {
    const wrapper = render(<Input {...testProps} />);
    const ele = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass(`${PM_PREFIX_CLS}-input-inner`);
    expect(ele.disabled).toBeFalsy();
    userEvent.type(ele, 'new test value');
    expect(testProps.onChange).toHaveBeenCalled();
    expect(ele.value).toBe('new test value');
  });

  test('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input {...testProps} disabled />);
    const ele = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(ele).toBeDisabled();
  });

  test('should render the diffent Input sizes on size property', () => {
    const wrapper1 = render(<Input {...testProps} size="lg" />);
    const ele1 = wrapper1.getByTestId(`${PM_PREFIX_CLS}-input`);
    expect(ele1).toHaveClass(`${PM_PREFIX_CLS}-size-lg`);

    cleanup();
    const wrapper2 = render(<Input {...testProps} size="sm" />);
    const ele2 = wrapper2.getByTestId(`${PM_PREFIX_CLS}-input`);
    expect(ele2).toHaveClass(`${PM_PREFIX_CLS}-size-sm`);
  });

  test('should render the icon Input on icon property', () => {
    const wrapper = render(<Input {...testProps} icon="search" />);
    const ele = wrapper.getByTestId(`${PM_PREFIX_CLS}-icon`);
    expect(ele).toBeInTheDocument();
  });

  test('should render prepand and append element on prepend/append property', () => {
    const wrapper = render(<Input {...testProps} prepend="http://" append=".com" />);
    const ele = wrapper.container.querySelector(`.${PM_PREFIX_CLS}-input-wrapper`);
    expect(ele).toHaveClass(`${PM_PREFIX_CLS}-input-group`);
    expect(wrapper.queryByText('http://')).toBeInTheDocument();
    expect(wrapper.queryByText('.com')).toBeInTheDocument();
  });
});
