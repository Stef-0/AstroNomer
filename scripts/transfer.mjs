import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import instanceConfig from "../instance.config.mjs";

async function main() {
  const transport = instanceConfig.deploy.transport;

  if (transport === "noop") {
    console.log("Transfer transport: noop. Build artifacts left in ./dist");
    return;
  }

  if (transport === "local-copy") {
    const target = process.env.DEPLOY_LOCAL_TARGET;

    if (!target) {
      throw new Error("DEPLOY_LOCAL_TARGET is required for local-copy transport.");
    }

    await fs.cp(path.resolve("dist"), path.resolve(target), {
      recursive: true,
      force: true
    });
    console.log(`Copied dist to ${target}`);
    return;
  }

  throw new Error(`Unsupported deploy transport: ${transport}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
