import { IRoundProps } from "@entities/competition/types/tournament/round-props";

export type ISeedProps = {
  id: number | string;
  teams: Array<{ name?: string; [key: string]: any }>;
  date?: string;
  mobileBreakpoint?: number;
  [key: string]: any;
};

export interface IRenderSeedProps {
  seed: ISeedProps;
  breakpoint?: number;
  roundIndex: number;
  seedIndex: number;
  rounds?: IRoundProps[];
}
