import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";
import { ITrauma } from "../model/types/trauma";

const mocked_traumas: ITrauma[] = [
  {
    id: 1,
    name: "ankle fracture",
    description: "very painful trauma",
    healDescription: "Drink tea",
    bodyPartId: 11,
    timeToRecover: 8640000000000,
  },
  {
    id: 2,
    name: "pain in the lumbar",
    description: "very painful trauma",
    healDescription: "Drink tea",
    bodyPartId: 4,
    timeToRecover: 17280000000000,
  },
  {
    id: 3,
    name: "Blood from nose",
    description: "very painful trauma",
    healDescription: "Drink tea",
    bodyPartId: 12,
    timeToRecover: 12960000000000,
  },
  {
    id: 4,
    name: "Fracture of the lumbar spine",
    description: "very painful trauma",
    healDescription: "Drink tea",
    bodyPartId: 4,
    timeToRecover: 13824000000000,
  },
  {
    id: 5,
    name: "Achilles tendon sprain or tear",
    description: "very painful trauma",
    healDescription: "Drink tea",
    bodyPartId: 13,
    timeToRecover: 25920000000000,
  },
  {
    id: 6,
    name: "Ankle sprains",
    description: "very painful trauma",
    healDescription: "Drink tea",
    bodyPartId: 11,
    timeToRecover: 20736000000000,
  },
  {
    id: 7,
    name: "Pain in the wrist",
    description: "very painful trauma",
    healDescription: "Drink tea",
    bodyPartId: 8,
    timeToRecover: 34560000000000,
  },
];

export const TraumaApi = async (ctx?: ApiContext) => {
  const instance = await Api({ ctx });

  return {
    async getTraumas() {
      return Promise.resolve(mocked_traumas);
    },
  };
};
