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

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

export const Default = () => {
  const [options, setOptions] = useState<AutoComplateProps['options']>([]);

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

export const Controlled = () => {
  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState<AutoComplateProps['options']>([]);

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

export const CustomOptions = () => {
  const options = [
    {
      label: <span style={{ color: '#1677ff' }}>自定义 label 1</span>,
      value: '自定义 label 1',
    },
    {
      label: <span style={{ color: '#0958d9' }}>自定义 label 2</span>,
      value: '自定义 label 2',
    },
    {
      label: <span style={{ color: '#003eb3' }}>自定义 label 3</span>,
      value: '自定义 label 3',
    },
  ];

  return <AutoComplete placeholder="input here" options={options} />;
};
CustomOptions.storyName = '自定义选项';

export const Customfilter = () => {
  const options = [
    {
      value: 'Burns Bay Road',
    },
    {
      value: 'Downing Street',
    },
    {
      value: 'Wall Street',
    },
  ];

  return (
    <>
      <AutoComplete
        placeholder="input here"
        options={options}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
      <AutoComplete placeholder="不筛选选项" options={options} filterOption={false} />
    </>
  );
};
Customfilter.storyName = '自定义筛选';
