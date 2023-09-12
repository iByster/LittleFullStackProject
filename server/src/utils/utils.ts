/* eslint-disable @typescript-eslint/no-explicit-any */
export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = '[Unable to stringify the thrown value]';
  try {
    stringified = JSON.stringify(value);
  } catch {
    /* empty */
  }

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return error;
}

export function withSingleton<T extends new (...args: any[]) => any>(Class: T) {
  let instance: InstanceType<T> | null = null;

  return class SingletonWrapper extends Class {
    static getInstance() {
      if (!instance) {
        instance = new SingletonWrapper();
      }
      return instance;
    }
  };
}
