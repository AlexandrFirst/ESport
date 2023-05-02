import next from "next";

import { createServer as HTTPSCreateServer } from "https";
import { createServer as HTTPCreateServer } from "http";

import { parse } from "url";
import fs from "fs";
import path from "path";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpsOptions = {
    key: fs.readFileSync(
      path.resolve(".cerfs", process.env.SSL_KEY_NAME ?? "")
    ),
    cert: fs.readFileSync(
      path.resolve(".cerfs", process.env.SSL_CERT_NAME ?? "")
    ),
  };

  if (!dev) {
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
    dev
      ? `> Server listening at http://localhost:${port}`
      : `> Server listening at https://localhost:${port}`
  );
});
