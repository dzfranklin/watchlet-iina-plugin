const { Namer } = require("@parcel/plugin");
const path = require("path");

const projectRoot = __dirname;

module.exports = new Namer({
  name({ bundle }) {
    const mainEntry = bundle.getMainEntry();
    if (!mainEntry?.filePath) {
      return null;
    }

    if (!mainEntry.filePath.startsWith(projectRoot)) {
      return null;
    }
    const filePath = mainEntry.filePath.slice(projectRoot.length + 1);

    if (filePath === "entrypoints/global.ts") {
      return "global.js";
    } else if (filePath === "entrypoints/index.ts") {
      return "index.js";
    }

    if (filePath.startsWith("ui/") && bundle.type === "html") {
      return path.basename(filePath);
    }

    // Let default namer handle everything else
    return null;
  },
});
