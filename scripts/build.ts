import * as esbuild from "esbuild";
import { createBuildSettings } from './settings.ts';

const settings = createBuildSettings({ minify: true });
await esbuild.build(settings);

esbuild.stop();