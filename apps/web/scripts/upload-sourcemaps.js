const { execSync } = require("child_process");

console.log("RUNNING SENTRY SOURCEMAP UPLOAD... ", process.env.VERCEL);

const SERVER_FILES_PATH = ".next/server";
const CLIENT_FILES_PATH = ".next/static/chunks";

try {
  console.log("Detected Vercel environment. Uploading Sentry sourcemaps...");
  const release = execSync("git rev-parse HEAD").toString().trim();

  // Add release
  execSync(`sentry-cli releases new ${release}`, { stdio: "inherit" });
  // Inject Debug IDs
  execSync(`sentry-cli sourcemaps inject ${CLIENT_FILES_PATH}`);
  execSync(`sentry-cli sourcemaps inject ${SERVER_FILES_PATH}`);
  // Upload
  execSync(`sentry-cli sourcemaps upload ${CLIENT_FILES_PATH} --validate --ext=js --ext=map`, {
    stdio: "inherit",
    env: process.env,
  });
  execSync(`sentry-cli sourcemaps upload ${SERVER_FILES_PATH} --validate --ext=js --ext=map`, {
    stdio: "inherit",
    env: process.env,
  });
} catch (err) {
  console.error("Sentry sourcemap upload failed:", err);
  process.exit(1);
}
