import { ApiContext } from "@/shared/types";
// import { Api } from "@/shared/config";
import { ISport } from "../model/types/sport";
import { SportType } from "../constants/sport-type";

const mockedSports: ISport[] = [
  {
    id: 1,
    name: "Swimming",
    type: SportType.Strength,
    description: "Suitable for everyone",
  },
  {
    id: 2,
    name: "Karate",
    type: SportType.Fighting,
    description: "Suitable for everyone",
  },
  {
    id: 3,
    name: "Powerlifting",
    type: SportType.Strength,
    description: "Suitable for everyone",
  },
  {
    id: 4,
    name: "Car racing",
    type: SportType.Endurance,
    description: "Suitable for everyone",
  },
  {
    id: 5,
    name: "Football",
    type: SportType.Endurance,
    description: "Suitable for everyone",
  },
  {
    id: 6,
    name: "Basketball",
    type: SportType.Endurance,
    description: "Suitable for everyone",
  },
];

export const SportApi = (ctx?: ApiContext) => {
  // const instance = Api({ ctx });

  return {
    getAllSports() {
      return new Promise<ISport[]>((resolve) => {
        resolve(mockedSports);
      });
    },
  };
};
