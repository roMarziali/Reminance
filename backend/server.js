const helmet = require("helmet");
const app = require("./app");
const config = require("config");
require('./startup/cron');

app.use(helmet());

const port = config.get("port") || "3000";

const http = require("http");
http
  .createServer(app)
  .listen(port, () => console.log(`Listening on port ${port}...`));
