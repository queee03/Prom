// import { useState } from 'react';
// import { action } from '@storybook/addon-actions';
import { useRef } from 'react';

import { ComponentMeta } from '@storybook/react';
import Button from 'components/Button';
import Input from 'components/Input';

import { FormInstance } from './form';
import Form from './index';

const Com: ComponentMeta<typeof Form> = {
  title: 'Form',
  component: Form,
  subcomponents: { Item: Form.Item },
  decorators: [(Story) => <div style={{ width: 500 }}>{Story()}</div>],
};
export default Com;

export const Default = () => {
  const formRef = useRef<FormInstance | null>(null);

  return (
    <Form
      ref={formRef}
      initialValues={{ username: 'happy', checkbox: false }}
      onFinish={(values) => {
        console.log('onFinish', values);
      }}
      onFinishFailed={(values, errors) => {
        console.log('onFinishFailed', values, errors);
      }}
    >
      <Form.Item
        name="username"
        label="用户名"
        initialValue="unhappy"
        validateTrigger="onChange"
        rules={[{ required: true }, { min: 4, max: 12 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[
          {
            validator: (_, value) => {
              const password = formRef.current?.getFieldValue('password');
              return password === value;
            },
            message: '两次输入的密码不一致',
          },
        ]}
      >
        <Input placeholder="确认密码" />
      </Form.Item>
      <Form.Item
        name="checkbox"
        initialValue={undefined}
        valuePropName="checked"
        getValueFromEvent={(e) => e.target.checked}
      >
        <Input type="checkbox" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
        <Button onClick={() => formRef.current?.resetFields()}>Reset</Button>
      </Form.Item>
    </Form>
  );
};
Default.storyName = '基本使用';
