import next from "next";
import { createServer } from "https";
import { parse } from "url";
import fs from "fs";
import path from "path";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: "localhost", port });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.resolve(".cerfs", "localhost-key.pem")),
  cert: fs.readFileSync(path.resolve(".cerfs", "localhost.pem")),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at https://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
