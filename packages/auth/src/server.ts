import fs from "fs";
import path from "path";
import { run } from "./utils/server";

export const privateKey = fs.readFileSync(
  path.join(__dirname, "../private_key.pem"),
  "utf-8"
);

run();
