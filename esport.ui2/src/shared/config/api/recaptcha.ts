import { ApiContext } from "@/shared/types";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export class ReCaptcha {
  constructor(
    private readonly siteKey: string,
    private readonly action?: string,
    private readonly ctx?: ApiContext
  ) {
    loadReCaptcha(siteKey, ctx);
    this.siteKey = siteKey;
    this.action = action;
    this.ctx = ctx;
  }

  async getToken(): Promise<string> {
    let token = "";
    if (!this.ctx) {
      await window?.grecaptcha
        .execute(this.siteKey, { action: this.action })
        .then((res: string) => {
          token = res;
        });
      return token;
    }
    return "";
  }
}

const loadReCaptcha = (siteKey: string, ctx?: ApiContext) => {
  if (!ctx) {
    const script = document?.createElement("script");
    if (script) {
      script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${siteKey}`;
      document?.body.appendChild(script);
    }
  }
};
