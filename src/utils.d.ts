interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

declare type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
