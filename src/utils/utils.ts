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

interface EventItem {
  trigger: string;
  func: Function;
}
export const generateTriggerMap = (events: Array<EventItem | undefined>) => {
  const store: Record<string, Function[]> = {};
  const result: Record<string, Function> = {};

  events
    .filter((item) => !!item)
    .forEach((item) => {
      const { trigger, func } = item!;
      if (!store[trigger]) store[trigger] = [];
      store[trigger].push(func);
    });

  const keys = Object.keys(store);

  keys.forEach((key) => {
    if (store[key].length === 1) {
      result[key] = store[key][0];
    } else {
      result[key] = (...args) => {
        store[key].forEach((func) => func(...args));
      };
    }
  });

  return result;
};
