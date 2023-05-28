import { ServerStage } from "@/shared/constants";

export class Logger {
  static Debug(message: string) {
    if (process.env.NEXT_PUBLIC_STAGE !== ServerStage.Prod) {
      console.log(message);
    }
  }
}
