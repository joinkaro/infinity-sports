import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isVercel = Boolean(process.env.VERCEL);
const isHostingerExport = process.env.HOSTINGER_EXPORT === "1";
const useNextBuild = isVercel || isHostingerExport;
const buildScript = useNextBuild
  ? path.join(projectRoot, "node_modules/next/dist/bin/next")
  : path.join(projectRoot, "scripts/run-framework.mjs");
const buildArgs = useNextBuild ? ["build", "--webpack"] : ["build"];

const result = spawnSync(process.execPath, [buildScript, ...buildArgs], {
  cwd: projectRoot,
  env: process.env,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
