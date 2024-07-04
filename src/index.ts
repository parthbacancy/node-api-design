import * as dotenv from "dotenv";
import config from "./config";
dotenv.config();

import app from "./server";

console.log(config);

app.listen(config.port, () => {
  console.log("hello on http://localhost:3002");
});
