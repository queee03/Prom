import { ComponentMeta, ComponentStory } from '@storybook/react';

import Menu from './index';

const Com: ComponentMeta<typeof Menu> = {
  title: 'Menu',
  component: Menu,
  subcomponents: { Item: Menu.Item, SubMenu: Menu.SubMenu },
  argTypes: {
    defaultIndex: { description: 'default index' },
  },
};
export default Com;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item>link1</Menu.Item>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.SubMenu title="sub">
      <Menu.Item>sub-link1</Menu.Item>
      <Menu.Item>sub-link2</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item>link2</Menu.Item>
  </Menu>
);

export const Default = Template.bind({});

export const Vertical = Template.bind({});
Vertical.storyName = '纵向 Menu';
Vertical.args = {
  mode: 'vertical',
};
Vertical.parameters = {
  backgrounds: {
    values: [
      { name: 'custom light', value: '#e6f7ff' },
      { name: 'custom dark', value: '#002766' },
    ],
  },
};
