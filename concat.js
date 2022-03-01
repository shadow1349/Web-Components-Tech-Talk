const fs = require("fs-extra");
const concat = require("concat");

(async function () {
  const files = [
    "./dist/web-component-project/runtime.js",
    "./dist/web-component-project/main.js",
    "./dist/web-component-project/polyfills.js",
  ];

  await fs.ensureDir("elements");
  await concat(files, "elements/elements.js");
  await fs.copyFile(
    "./dist/web-component-project/styles.css",
    "elements/styles.css"
  );
})();
