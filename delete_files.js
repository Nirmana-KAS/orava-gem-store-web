const fs = require("fs");
const path = require("path");

const files = [
  ".env.local.example",
  ".env.production.example",
  "public/sitemap.xml",
  "public/sitemap-0.xml",
];

files.forEach((f) => {
  try {
    const fullPath = path.resolve(f);
    fs.unlinkSync(fullPath);
    console.log("Deleted:", f);
  } catch (e) {
    console.log("Skip:", f, "(not found or error)");
  }
});
