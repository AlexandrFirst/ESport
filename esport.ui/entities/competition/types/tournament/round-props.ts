import { ISeedProps } from "@entities/competition/types/tournament/seed";

export type IRoundProps = {
  seeds: ISeedProps[];
  title: string;
  [key: string]: any;
};
