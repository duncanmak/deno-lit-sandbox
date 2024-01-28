import esbuild from "esbuild";
import { createBuildSettings } from './settings.js';

const settings = createBuildSettings({ minify: true });
await esbuild.build(settings);

await esbuild.stop();