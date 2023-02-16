import { ComponentMeta, ComponentStory } from '@storybook/react';

import mdx from './button.mdx';
import Button from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const Com: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
export default Com;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '默认按钮',
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
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
