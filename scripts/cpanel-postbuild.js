#!/usr/bin/env node
/**
 * Copies Apache rules into Next static export (out/) for cPanel public_html.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const htaccessSrc = path.join(root, "deploy", "cpanel", "public_html.htaccess");
const htaccessDest = path.join(outDir, ".htaccess");

if (!fs.existsSync(outDir)) {
  console.error("❌ out/ not found. Run: npm run build:cpanel");
  process.exit(1);
}

if (!fs.existsSync(htaccessSrc)) {
  console.error("❌ Missing", htaccessSrc);
  process.exit(1);
}

fs.copyFileSync(htaccessSrc, htaccessDest);
console.log("✅ Copied .htaccess → out/.htaccess");
