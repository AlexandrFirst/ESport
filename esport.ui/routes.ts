export const routes = {
  Main: "/",
  Register: "/register",
  Login: "/login",
  Test: "/test",

  Competition: {
    Main: "/competition",
    Id: (id: string) => `/competition/${id}`,
    Create: "/competition/create",
  },
};
