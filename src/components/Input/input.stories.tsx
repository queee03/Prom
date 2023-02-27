import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from './index';

// 受控组件
const ControlledInput = () => {
  const [value, setValue] = useState<string>();
  return <Input value={value} onChange={(e) => setValue(e.target.value)}></Input>;
};

const Com: ComponentMeta<typeof Input> = {
  title: 'Input',
  component: Input,
};
export default Com;

// const Template: ComponentStory<typeof Input> = (args) => <Input {...args}></Input>;
const Template: ComponentStory<typeof Input> = (args) => (
  <ControlledInput {...args}></ControlledInput>
);

export const Default = Template.bind({});
Default.args = {
  prepend: 'pre',
  // append: 'app',
  // icon: 'coffee',
};
