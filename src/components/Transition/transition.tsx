import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const Transition: React.FC<TransitionProps> = ({ children, classNames, animation, ...props }) => {
  return (
    <CSSTransition classNames={classNames || animation} {...props}>
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
export default Transition;
