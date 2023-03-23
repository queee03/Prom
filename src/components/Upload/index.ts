import Dragger from './dragger';
import Upload from './upload';

export type UploadComponentType = typeof Upload & {
  Dragger: typeof Dragger;
};

const UploadComponent = Upload as UploadComponentType;
UploadComponent.Dragger = Dragger;

export default UploadComponent;
