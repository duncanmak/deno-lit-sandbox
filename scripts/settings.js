import esbuildPluginTsc from "esbuild-plugin-tsc";

export function createBuildSettings(options) {
  return {
    plugins: [
      esbuildPluginTsc({ force: true }),
    ],
    entryPoints: ["src/main.ts"],
    outfile: "dist/bundle.js",
    bundle: true,
    format: "esm",
    ...options,
  };
}
