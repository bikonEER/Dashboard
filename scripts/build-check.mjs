import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const required = [
  "index.html",
  "src/app.js",
  "src/styles.css"
];

for (const file of required) {
  await access(join(process.cwd(), file));
}

const html = await readFile(join(process.cwd(), "index.html"), "utf8");
const app = await readFile(join(process.cwd(), "src/app.js"), "utf8");
const css = await readFile(join(process.cwd(), "src/styles.css"), "utf8");

if (!html.includes('type="module"')) throw new Error("index.html must load app.js as a module");
if (!app.includes("renderApp")) throw new Error("src/app.js must expose the render flow");
if (!css.includes(":root")) throw new Error("src/styles.css must define design tokens");

console.log("Build check passed: static demo assets are present and valid.");
