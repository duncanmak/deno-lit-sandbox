import { bundle } from "https://deno.land/x/emit/mod.ts";

const url = new URL("../src/element.ts", import.meta.url);
const result = await bundle(url.href, {
  compilerOptions: { emitDecoratorMetadata: true, sourceMap: true },
  importMap: "deno.json",
});

Deno.writeTextFileSync(`dist/module.js`, result.code);
