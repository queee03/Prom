import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

type OriginFormProps = React.FormHTMLAttributes<HTMLFormElement>;
type FormProps = OriginFormProps;

export const Form: React.FC<FormProps> = (props) => {
  const { children, className, ...restProps } = props;
  const classes = classnames(`${PM_PREFIX_CLS}-form`, className);
  return (
    <form className={classes} {...restProps}>
      {children}
    </form>
  );
};

export default Form;
