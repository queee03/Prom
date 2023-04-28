import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import Upload from './index';
// import { PM_PREFIX_CLS } from '@/configs/constant';
import { UploadProps } from './interface';

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>;
  };
});

/* 模拟接口请求 */
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  // drag: true,
};

describe('test upload component', () => {
  test('upload process should works fine', async () => {
    const wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    const fileInput = wrapper.container.querySelector(`.upload-input`) as HTMLInputElement;
    const uploadArea = wrapper.queryByText('Click to upload') as HTMLElement;

    const { queryByText, getByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: 'cool' });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();

    userEvent.upload(fileInput, [testFile]);
    expect(queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      }),
    );
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      }),
    );

    expect(queryByText('times')).toBeInTheDocument();
    // @ts-ignore △ts待解决
    testProps.onRemove.mockReturnValue(true);
    userEvent.click(getByText('times'));
    await waitFor(() => {
      expect(queryByText('test.png')).not.toBeInTheDocument();
    });
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      }),
    );
  });

  test('drag and drop files should works fine', async () => {
    const wrapper = render(
      <Upload {...testProps}>
        <Upload.Dragger>Dragger to upload</Upload.Dragger>
      </Upload>,
    );
    const uploadArea = wrapper.queryByText('Dragger to upload') as HTMLElement;

    mockedAxios.post.mockResolvedValue({ data: 'cool' });
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');

    /* 旧的解决方式：模拟 drop */
    // const mockDropEvent = createEvent.drop(uploadArea)
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile]
    //   }
    // })
    // fireEvent(uploadArea, mockDropEvent)
    /* 现在已支持 */
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile],
      },
    });

    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      }),
    );
  });
});
