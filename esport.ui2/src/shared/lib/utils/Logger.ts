import { ServerStage } from "@/shared/constants";

export class Logger {
  static Debug(...messages: any[]) {
    if (process.env.NEXT_PUBLIC_STAGE !== ServerStage.Prod) {
      console.log(...messages);
    }
  }

  static Error(...messages: any[]) {
    if (process.env.NEXT_PUBLIC_STAGE !== ServerStage.Prod) {
      console.error(...messages);
    }
  }
}
