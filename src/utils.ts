export const isNil = (value: unknown): value is null | undefined => value == null;

export const mockPromise = (fn?: () => void, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn?.();
      resolve(true);
    }, delay);
  });
};

export const generateId = () =>
  Number(`${Math.random().toString().slice(2)}${Date.now()}`).toString(36);
