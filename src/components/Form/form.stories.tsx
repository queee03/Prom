// import { useState } from 'react';
// import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import Button from 'components/Button';
import Input from 'components/Input';

import Form from './index';

const Com: ComponentMeta<typeof Form> = {
  title: 'Form',
  component: Form,
  subcomponents: { Item: Form.Item },
  decorators: [(Story) => <div style={{ width: 500 }}>{Story()}</div>],
};
export default Com;

export const Default = () => {
  return (
    <Form>
      <Form.Item name="username" label="用户名">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input type="password" />
      </Form.Item>
      <Form.Item name="no-label">
        <Input placeholder="no-label" />
      </Form.Item>
      <Form.Item
        name="checkbox"
        valuePropName="checked"
        getValueFromEvent={(e) => e.target.checked}
      >
        <Input type="checkbox" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
Default.storyName = '基本使用';
