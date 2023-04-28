import { config } from 'react-transition-group';

import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PM_PREFIX_CLS } from '@/configs/constant';

import { AutoCompleteProps, OptionType } from './autoComplete';
import AutoComplete from './index';

config.disabled = true;

const testOptions: OptionType[] = [
  { value: 'ab', label: 'label:ab' },
  { value: 'abc', label: 'label:abc' },
  { value: 'b', label: 'label:b' },
  { value: 'c', label: 'label:c' },
  { value: 'ABC', label: 'label:ABC' },
];

const testProps: AutoCompleteProps = {
  options: testOptions,
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

let wrapper: RenderResult;
let inputNode: HTMLInputElement;

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
  });

  test('test basic AutoComplete behavior', async () => {
    // input change
    userEvent.type(inputNode, 'a');
    await waitFor(() => {
      expect(wrapper.queryByText('label:ab')).toBeInTheDocument();
    });
    // should have two suggestion items
    const currentOptions = wrapper.container.querySelectorAll(`.${PM_PREFIX_CLS}-suggestion-item`);
    expect(currentOptions.length).toEqual(2);
    // click the first item
    userEvent.click(wrapper.getByText('label:ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith('ab', { value: 'ab', label: 'label:ab' });
    expect(wrapper.queryByText('label:ab')).not.toBeInTheDocument();
    // fill the input
    expect(inputNode.value).toBe('ab');
  });

  it('should provide keyboard support', async () => {
    // input change
    userEvent.type(inputNode, 'a');
    await waitFor(() => {
      expect(wrapper.queryByText('label:ab')).toBeInTheDocument();
      expect(wrapper.queryByText('label:abc')).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText('label:ab');
    const secondResult = wrapper.queryByText('label:abc');

    // arrow down
    userEvent.keyboard('[ArrowDown]');
    expect(firstResult).toHaveClass('is-active');
    userEvent.keyboard('[ArrowDown]');
    expect(secondResult).toHaveClass('is-active');
    // arrow up
    userEvent.keyboard('[ArrowUp]');
    expect(firstResult).toHaveClass('is-active');
    // press enter
    userEvent.keyboard('[Enter]');
    expect(testProps.onSelect).toHaveBeenCalledWith('ab', { value: 'ab', label: 'label:ab' });
    expect(wrapper.queryByText('label:ab')).not.toBeInTheDocument();
  });

  it('click outside should hide the dropdown', async () => {
    // input change
    userEvent.type(inputNode, 'a');
    await waitFor(() => {
      expect(wrapper.queryByText('label:ab')).toBeInTheDocument();
    });
    userEvent.click(wrapper.container);
    await waitFor(() => {
      expect(wrapper.queryByText('label:ab')).not.toBeInTheDocument();
    });
  });

  it('renderOption should generate the right template', async () => {
    const renderOption = (item: OptionType) => {
      const itemWithNumber = item;
      return {
        value: item.value,
        label: <>name: {itemWithNumber.label}</>,
      };
    };

    const testPropsWithCustomRender: AutoCompleteProps = {
      ...testProps,
      placeholder: 'auto-complete-2',
      options: testOptions.map((item) => renderOption(item)),
    };
    const wrapper2 = render(<AutoComplete {...testPropsWithCustomRender} />);
    const inputNode2 = wrapper2.getByPlaceholderText('auto-complete-2') as HTMLInputElement;
    userEvent.type(inputNode2, 'a');
    await waitFor(() => {
      expect(wrapper.queryByText('name: label:ab')).toBeInTheDocument();
    });
  });

  it('filterOption should works fine', async () => {
    const testPropsWithFilterOption: AutoCompleteProps = {
      ...testProps,
      placeholder: 'auto-complete-3',
      filterOption: jest.fn(
        (inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
      ),
    };
    const wrapper3 = render(<AutoComplete {...testPropsWithFilterOption} />);
    const inputNode3 = wrapper3.getByPlaceholderText('auto-complete-3') as HTMLInputElement;
    userEvent.type(inputNode3, 'a');
    await waitFor(() => {
      expect(wrapper.queryByText('label:ABC')).toBeInTheDocument();
    });
  });
});
