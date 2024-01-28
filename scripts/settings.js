import esbuildPluginTsc from "esbuild-plugin-tsc";

export function createBuildSettings(options) {
  return {
    plugins: [
      esbuildPluginTsc({ force: true }),
    ],
    entryPoints: ["src/element.ts"],
    outfile: "dist/element.js",
    bundle: true,
    format: "esm",
    ...options,
  };
}
