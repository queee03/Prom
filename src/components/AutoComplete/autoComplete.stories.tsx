import { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { AutoComplateProps } from './autoComplete';
import AutoComplete from './index';

const Com: ComponentMeta<typeof AutoComplete> = {
  title: 'AutoComplete',
  component: AutoComplete,
  decorators: [(Story) => <div style={{ width: 350 }}>{Story()}</div>],
};
export default Com;

export const Default = () => {
  const [options, setOptions] = useState<AutoComplateProps['options']>([]);

  const mockVal = (str: string, repeat = 1) => str.repeat(repeat);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <AutoComplete
      placeholder="input here"
      options={options}
      onSearch={(text) => setOptions(getPanelValue(text))}
    />
  );
};
Default.storyName = '基本使用';

export const CustomOptions = () => {
  const [options, setOptions] = useState<AutoComplateProps['options']>([]);

  const mockVal = (str: string, repeat = 1) => ({
    label: <span style={{ color: '#1677ff' }}>自定义 label {str.repeat(repeat)}</span>,
    value: str.repeat(repeat),
  });

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <AutoComplete
      placeholder="input here"
      options={options}
      onSearch={(text) => setOptions(getPanelValue(text))}
    />
  );
};
CustomOptions.storyName = '自定义选项';

export const Controlled = () => {
  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState<AutoComplateProps['options']>([]);

  const mockVal = (str: string, repeat = 1) => str.repeat(repeat);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <AutoComplete
      placeholder="input here"
      options={options}
      value={value}
      onChange={setValue}
      onSearch={(text) => setOptions(getPanelValue(text))}
      onSelect={(selectedValue) => {
        setValue(`修改值 ${selectedValue}`);
      }}
    />
  );
};
Controlled.storyName = '受控的';
