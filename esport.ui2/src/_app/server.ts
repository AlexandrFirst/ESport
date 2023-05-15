import next from "next";

import { createServer as HTTPSCreateServer } from "https";
import { createServer as HTTPCreateServer } from "http";

import { parse } from "url";
import fs from "fs";
import path from "path";

enum ServerStage {
  Dev = "Development",
  Local = "Local",
  Prod = "Production",
}

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const stage = (process.env.STAGE ?? ServerStage.Dev) as ServerStage;
  if (![ServerStage.Dev, ServerStage.Local, ServerStage.Prod].includes(stage)) {
    throw new Error("Stage is not specified");
  }

  const isDevStage = stage === ServerStage.Dev;
  if (!isDevStage) {
    const cert = fs.readFileSync(
      path.resolve(".cerfs", process.env.SSL_CERT_NAME ?? "")
    );
    const key = fs.readFileSync(
      path.resolve(".cerfs", process.env.SSL_KEY_NAME ?? "")
    );
    if (!cert || !key) {
      throw new Error("Error while reading certificates");
    }
    const httpsOptions = { key, cert };

    HTTPSCreateServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    }).listen(port);
  } else {
    HTTPCreateServer((req, res) => {
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    }).listen(port);
  }

  console.log(
    isDevStage
      ? `> Server listening at http://localhost:${port}`
      : `> Server listening at https://localhost:${port}`
  );
});
