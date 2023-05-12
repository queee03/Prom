import { ComponentMeta, ComponentStory } from '@storybook/react';

import mdx from './button.mdx';
import Button from './index';

const Com: ComponentMeta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
export default Com;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '默认按钮',
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'Primary',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small',
};
