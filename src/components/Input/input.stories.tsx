import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input from './index';

const Com: ComponentMeta<typeof Input> = {
  title: 'Input',
  component: Input,
};
export default Com;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args}></Input>;

export const Default = Template.bind({});
Default.args = {
  prepend: 'pre',
  append: 'app',
  // icon: 'coffee',
};
