export const isNil = (value: unknown): value is null | undefined => value == null;

export const mockPromise = (fn?: () => void, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn?.();
      resolve(true);
    }, delay);
  });
};
