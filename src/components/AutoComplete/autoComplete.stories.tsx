import { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { mockPromise } from '@/utils/utils';

import { AutoCompleteProps } from './autoComplete';
import AutoComplete from './index';

const Com: ComponentMeta<typeof AutoComplete> = {
  title: 'AutoComplete',
  component: AutoComplete,
  decorators: [(Story) => <div style={{ width: 350, marginBottom: 140 }}>{Story()}</div>],
};
export default Com;

export const Default = () => {
  const options = [{ value: 'abc' }, { value: 'bcd' }, { value: 'cde' }];
  return <AutoComplete placeholder="input here" options={options} />;
};
Default.storyName = '基本使用';

export const Controlled = () => {
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <AutoComplete
      placeholder="input here"
      loading={loading}
      options={options}
      value={value}
      onChange={setValue}
      onSearch={async (text) => {
        setLoading(true);
        await mockPromise(() => setOptions(getPanelValue(text)));
        setLoading(false);
      }}
      onSelect={(selectedValue) => {
        setValue(`修改值 ${selectedValue}`);
      }}
      filterOption={false}
    />
  );
};
Controlled.storyName = '受控的';

export const CustomOptions = () => {
  const options = [
    {
      label: <span style={{ color: '#ffec3d' }}>自定义 label 1</span>,
      value: '自定义 label 1',
    },
    {
      label: <span style={{ color: '#fadb14' }}>自定义 label 2</span>,
      value: '自定义 label 2',
    },
    {
      label: <span style={{ color: '#d4b106' }}>自定义 label 3</span>,
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
        placeholder="try to type `b`"
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
