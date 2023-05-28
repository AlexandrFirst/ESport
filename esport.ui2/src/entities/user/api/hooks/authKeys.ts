export const authKeys = {
  all: ["auth"],
  logout: () => [...authKeys.all, "logout"],
  confirm: (token: string) => [...authKeys.all, "confirm", token],
};
