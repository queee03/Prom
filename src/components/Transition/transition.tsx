import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';

type TransitionProps = Omit<CSSTransitionProps, 'in' | 'timeout'> & {
  in: CSSTransitionProps['in'];
  timeout: CSSTransitionProps['timeout'];
  animation?: AnimationName;
  wrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = ({
  children,
  timeout,
  classNames,
  animation,
  wrapper,
  ...restProps
}) => {
  return (
    <CSSTransition classNames={classNames || animation} timeout={timeout!} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
export default Transition;
