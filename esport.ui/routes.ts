const competitionRoute = "competition";

export const routes = {
  Main: "/",
  Register: "/register",
  Login: "/login",
  Test: "/test",
  Streams: "/streams",

  Competition: {
    Main: `/${competitionRoute}`,
    Id: (id: string) => `/${competitionRoute}/${id}`,
    Create: `/${competitionRoute}/create`,
    Category: {
      Id: (compId: string, catId: string) =>
        `/${competitionRoute}/${compId}/${catId}`,
    },
  },
};
