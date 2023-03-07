import { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import AutoComplete from './index';

const Com: ComponentMeta<typeof AutoComplete> = {
  title: 'AutoComplete',
  component: AutoComplete,
  // decorators: [(Story) => <div style={{ width: 350 }}>{Story()}</div>],
};
export default Com;

export const Default = () => {
  const [options, setOptions] = useState<Array<{ value: string }>>([]);

  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <AutoComplete
      options={options}
      onSearch={(text) => setOptions(getPanelValue(text))}
      placeholder="input here"
    />
  );
};
Default.storyName = '基本使用';
