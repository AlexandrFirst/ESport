export const uniqueObjectsArray = <T>(arr: T[], key: keyof T) => {
  return Array.from(new Map(arr.map((item) => [item[key], item])).values());
};
