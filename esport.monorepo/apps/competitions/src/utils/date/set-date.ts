type Maybe<T> = T | null | undefined;

export const setDate = (date: Maybe<Date | string>) => {
  if (date) {
    return new Date(date);
  }
};
