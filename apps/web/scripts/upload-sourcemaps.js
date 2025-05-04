const { execSync } = require("child_process");

console.log("RUNNING SENTRY SOURCEMAP UPLOAD... ", process.env.VERCEL);

if (process.env.VERCEL) {
  try {
    console.log("Detected Vercel environment. Uploading Sentry sourcemaps...");
    execSync(
      // 'sentry-cli sourcemaps upload --help',
      "sentry-cli sourcemaps upload .next/static/chunks --validate --ext=js --ext=map",
      { stdio: "inherit", env: process.env }
    );
  } catch (err) {
    console.error("Sentry sourcemap upload failed:", err);
    process.exit(1);
  }
} else {
  console.log("Not in Vercel environment. Skipping Sentry sourcemap upload.");
}
