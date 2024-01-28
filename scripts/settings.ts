import * as esbuild from "esbuild";
import * as path from "std/path/mod.ts";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.5/mod.ts";
import esbuildPluginTsc from "npm:esbuild-plugin-tsc";

export function createBuildSettings(options: object): esbuild.BuildOptions {
  return {
    plugins: [
      // ...denoPlugins({ configPath: path.resolve("./deno.json") }),
      esbuildPluginTsc({ force: true }),
    ],
    entryPoints: ["src/element.ts"],
    outfile: "www/element.js",
    bundle: true,
    format: "esm",
    ...options,
  };
}
