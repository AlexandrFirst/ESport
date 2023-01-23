export const getRandomId = (): string =>
  (Math.random() + 1).toString(36).substring(7);
