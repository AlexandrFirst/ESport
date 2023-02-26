import { IRoundProps } from "@entities/competition/types/tournament/round-props";

export type ISeedProps = {
  id: number | string;
  compatitors: Array<{ name?: string; [key: string]: any }>;
  roundNumber?: string;
  mobileBreakpoint?: number;
  [key: string]: any;
};

export interface IRenderRoundProps {
  round: ISeedProps;
  breakpoint?: number;
  roundIndex: number;
  seedIndex: number;
  rounds?: IRoundProps[];
}
