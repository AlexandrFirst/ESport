import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";
import { IBodyPart } from "../model/types/bodyPart";

const mocked_bodyParts: IBodyPart[] = [
  {
    id: 1,
    name: "Shoulder",
    description: "Some shoulder description",
  },
  {
    id: 2,
    name: "Neck",
    description: "Some neck description",
  },
  {
    id: 3,
    name: "Backbone",
    description: "Some backbone description",
  },
  {
    id: 4,
    name: "Lumbar",
    description: "Some lumbar description",
  },
  {
    id: 5,
    name: "Arm",
    description: "Some arm description",
  },
  {
    id: 6,
    name: "Forearm",
    description: "Some forearm description",
  },
  {
    id: 7,
    name: "Elbow",
    description: "Some elbow description",
  },
  {
    id: 8,
    name: "Wrist",
    description: "Some wrist description",
  },
  {
    id: 9,
    name: "Leg",
    description: "Some leg description",
  },
  {
    id: 10,
    name: "Foot",
    description: "Some foot description",
  },
  {
    id: 11,
    name: "Ankle",
    description: "Some ankle description",
  },
  {
    id: 12,
    name: "Nose",
    description: "Some nose description",
  },
  {
    id: 13,
    name: "tendon",
    description: "Some tendon description",
  },
];

export const BodyPartApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    async getBodyParts() {
      return Promise.resolve(mocked_bodyParts);
    },
  };
};
