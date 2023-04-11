import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import useStore from './useStore';

type OriginFormProps = React.FormHTMLAttributes<HTMLFormElement>;
type FormProps = OriginFormProps;

export const Form: React.FC<FormProps> = (props) => {
  const { children, className, ...restProps } = props;
  const { form, fields } = useStore();

  const classes = classnames(`${PM_PREFIX_CLS}-form`, className);
  return (
    <>
      <form className={classes} {...restProps}>
        {children}
      </form>
      <div>
        <pre>{JSON.stringify(form)}</pre>
        <pre>{JSON.stringify(fields)}</pre>
      </div>
    </>
  );
};

export default Form;
