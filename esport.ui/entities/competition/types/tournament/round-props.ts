import { ISeedProps } from "@entities/competition/types/tournament/seed";

export type IRoundProps = {
  rounds: ISeedProps[];
  title: string;
  [key: string]: any;
};
