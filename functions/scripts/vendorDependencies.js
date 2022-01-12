const fs = require("fs/promises");
const path = require("path");

async function main() {
  const packagesPath = path.join(process.cwd(), "..", "packages");

  try {
    await fs.stat(packagesPath);
  } catch (error) {
    console.error(error);
    return;
  }

  const packageJson = await fs.readFile("package.json");

  const parsedPackageJson = JSON.parse(packageJson.toString());

  const vendoredDependencies = parsedPackageJson.vendoredDependencies;

  if (!Array.isArray(vendoredDependencies)) {
    return;
  }

  await Promise.all(
    vendoredDependencies.map(async (module) => {
      const vendorPath = path.join(process.cwd(), "vendor", module);

      try {
        await fs.stat(vendorPath);
        return;
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error(error);
          return;
        }
      }

      const modulePath = path.join(process.cwd(), "..", "packages", module);

      await fs.symlink(modulePath, vendorPath, "junction");
    })
  );
}

main();
