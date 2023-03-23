import classnames from 'classnames';
import Icon from 'components/Icon';
import Progress from 'components/Progress';
import { PM_PREFIX_CLS } from 'configs/constant';

import { UploadFileStatus, UploadListProps } from './interface';

const fileStatusMap: Partial<Record<UploadFileStatus, React.ReactElement>> = {
  ready: <Icon icon="spinner" spin theme="primary" />,
  uploading: <Icon icon="spinner" spin theme="primary" />,
  // success: <Icon icon="check-circle" theme="success" />,
  // error: <Icon icon="times-circle" theme="danger" />,
};

export const UploadList: React.FC<UploadListProps> = (props) => {
  const { className, fileList, onRemove, ...restProps } = props;

  return (
    <ul className={classnames(`${PM_PREFIX_CLS}-upload-list`, className)} {...restProps}>
      {fileList.map((item) => {
        return (
          <li className={`${PM_PREFIX_CLS}-upload-list-item`} key={item.uid}>
            <span className={classnames(`file-name`, `file-name-${item.status}`)}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">{item.status && fileStatusMap[item.status]}</span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => onRemove?.(item)} />
            </span>
            {(item.status === 'ready' || item.status === 'uploading') && (
              <Progress percent={item.percent || 0} strokeHeight={8} showText={false} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
