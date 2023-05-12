import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from './index';

const Com: ComponentMeta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  decorators: [(Story) => <div style={{ width: 350 }}>{Story()}</div>],
};
export default Com;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args}></Input>;

export const Default = Template.bind({});
Default.storyName = '基本使用';
Default.args = {
  placeholder: 'input here',
};

export const Disabled = Template.bind({});
Disabled.storyName = '被禁用的';
Disabled.args = {
  disabled: true,
};

export const Size = () => (
  <>
    <Input defaultValue="large size" size="lg" />
    <Input defaultValue="normal size" />
    <Input defaultValue="small size" size="sm" />
  </>
);
Size.storyName = '三种大小';

export const Icon = () => (
  <>
    <Input icon="search" placeholder="search" />
    <Input icon="music" placeholder="play" />
  </>
);
Icon.storyName = '带图标';

export const Pend = () => (
  <>
    <Input prepend="http://" append=".com" defaultValue="mysite" />
  </>
);
Pend.storyName = '前置/后置标签';

export const Controlled = () => {
  const [value, setValue] = useState<string>();
  return (
    <Input
      placeholder="受控的输入框"
      defaultValue="受控组件的 defaultValue 不应该生效"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
Controlled.storyName = '受控的输入框';
