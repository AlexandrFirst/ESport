const competitionRoute = "competition";
const userRoute = "user";
const profileRoute = "profile";

export const routes = {
  Main: "/",
  Register: "/register",
  Login: "/login",
  Test: "/nigga",
  Streams: "/streams",

  User: {
    Profile: {
      Main: `/${userRoute}/${profileRoute}`,
      Competitions: `/${userRoute}/${profileRoute}/competitions`,
    },
  },

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
